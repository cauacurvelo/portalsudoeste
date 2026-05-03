/**
 * Script de Migração: WordPress → Supabase
 * Portal do Sudoeste
 *
 * Execução: npx ts-node --project tsconfig.json scripts/migrate-wordpress.ts
 *
 * Este script extrai TODOS os posts do WordPress antigo (portaldosudoeste.com.br/v1)
 * e insere no banco de dados Supabase do novo portal.
 */

import { createClient } from '@supabase/supabase-js'

// ─── Configuração ───────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://cnnqmguqbsdcojakslse.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubnFtZ3VxYnNkY29qYWtzbHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMzNDI2MiwiZXhwIjoyMDkyOTEwMjYyfQ.SR0YjyhMszTz5m-EP08IseU_QVJdPXgXl7dLXuCfdHU'
const WP_API = 'https://www.portaldosudoeste.com.br/v1/wp-json/wp/v2'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
})

// ─── Helpers ─────────────────────────────────────────────────────────────────
function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                headers: { 'User-Agent': 'PortalSudoeste-Migrator/1.0' }
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return await res.json()
        } catch (err) {
            console.warn(`  ⚠️  Tentativa ${i + 1} falhou para ${url}`)
            if (i === retries - 1) throw err
            await sleep(2000 * (i + 1))
        }
    }
}

// ─── Migração de Categorias ───────────────────────────────────────────────────
async function migrateCategories(): Promise<Map<number, string>> {
    console.log('\n📁 Migrando categorias...')
    const categoryMap = new Map<number, string>()

    let page = 1
    while (true) {
        const data = await fetchWithRetry(`${WP_API}/categories?per_page=100&page=${page}`)
        if (!data || data.length === 0) break

        const rows = data.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: stripHtml(cat.description || ''),
            count: cat.count,
        }))

        const { error } = await supabase.from('categories').upsert(rows, { onConflict: 'id' })
        if (error) console.error('  ❌ Erro ao inserir categorias:', error.message)
        else {
            rows.forEach((r: any) => categoryMap.set(r.id, r.name))
            console.log(`  ✅ Página ${page}: ${rows.length} categorias`)
        }

        if (data.length < 100) break
        page++
    }

    console.log(`  📊 Total de categorias: ${categoryMap.size}`)
    return categoryMap
}

// ─── Migração de Posts ────────────────────────────────────────────────────────
async function migratePosts(categoryMap: Map<number, string>) {
    console.log('\n📰 Migrando posts...')

    // Descobrir total de páginas
    const firstRes = await fetch(`${WP_API}/posts?per_page=100&page=1&_embed`, {
        headers: { 'User-Agent': 'PortalSudoeste-Migrator/1.0' }
    })
    const totalPages = parseInt(firstRes.headers.get('X-WP-TotalPages') || '1')
    const totalPosts = parseInt(firstRes.headers.get('X-WP-Total') || '0')
    console.log(`  📊 Total: ${totalPosts} posts em ${totalPages} páginas`)

    let migratedCount = 0
    let errorCount = 0
    const BATCH_SIZE = 50 // Inserir no Supabase de 50 em 50

    for (let page = 1; page <= totalPages; page++) {
        try {
            const data = page === 1
                ? await firstRes.json()
                : await fetchWithRetry(`${WP_API}/posts?per_page=100&page=${page}&_embed`)

            if (!data || data.length === 0) break

            const rows = data.map((post: any) => {
                // Extrair categoria principal
                const categoryIds: number[] = post.categories || []
                const categoryName = categoryIds.length > 0
                    ? (categoryMap.get(categoryIds[0]) || 'Notícias')
                    : 'Notícias'

                // Extrair imagem de destaque
                const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
                const imageUrl = featuredMedia?.source_url ||
                    featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
                    ''

                // Extrair autor
                const authorName = post._embedded?.['author']?.[0]?.name || 'Redação Portal'

                // Extrair tags como array de strings
                const tagObjects = post._embedded?.['wp:term']?.[1] || []
                const tags = tagObjects.map((t: any) => t.name)

                // Limpar excerpt (resumo)
                const summary = stripHtml(post.excerpt?.rendered || '').substring(0, 500)

                return {
                    id: post.id,
                    slug: post.slug,
                    title: stripHtml(post.title?.rendered || ''),
                    summary,
                    content: post.content?.rendered || '',
                    category: categoryName,
                    city: null,
                    author: authorName,
                    date: post.date_gmt ? `${post.date_gmt}Z` : post.date,
                    image_url: imageUrl,
                    featured: false,
                    views: 0,
                    tags: tags.length > 0 ? tags : null,
                }
            })

            // Inserir em lotes de BATCH_SIZE
            for (let i = 0; i < rows.length; i += BATCH_SIZE) {
                const batch = rows.slice(i, i + BATCH_SIZE)
                const { error } = await supabase
                    .from('posts')
                    .upsert(batch, { onConflict: 'id' })

                if (error) {
                    console.error(`  ❌ Erro lote página ${page}:`, error.message)
                    errorCount += batch.length
                } else {
                    migratedCount += batch.length
                }
            }

            const progress = Math.round((page / totalPages) * 100)
            console.log(`  📄 Página ${page}/${totalPages} (${progress}%) — ${migratedCount} posts migrados`)

            // Rate limiting: pausar entre páginas para não sobrecarregar
            await sleep(300)

        } catch (err: any) {
            console.error(`  ❌ Erro na página ${page}:`, err.message)
            errorCount++
            await sleep(2000)
        }
    }

    console.log(`\n✅ Migração concluída!`)
    console.log(`   Posts migrados: ${migratedCount}`)
    console.log(`   Erros: ${errorCount}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    console.log('🚀 Iniciando migração: WordPress → Supabase')
    console.log(`   Origem: ${WP_API}`)
    console.log(`   Destino: ${SUPABASE_URL}`)
    console.log('─'.repeat(50))

    const startTime = Date.now()

    try {
        const categoryMap = await migrateCategories()
        await migratePosts(categoryMap)

        const elapsed = Math.round((Date.now() - startTime) / 1000)
        const minutes = Math.floor(elapsed / 60)
        const seconds = elapsed % 60
        console.log(`\n⏱️  Tempo total: ${minutes}m ${seconds}s`)
        console.log('🎉 Banco de dados pronto!')
    } catch (err: any) {
        console.error('\n💥 Erro fatal:', err.message)
        process.exit(1)
    }
}

main()
