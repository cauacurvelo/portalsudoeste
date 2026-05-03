/**
 * Script de Migração COMPLETO: WordPress → Supabase
 * Portal do Sudoeste
 *
 * Migra: posts, categorias, imagens (upload para Supabase Storage)
 * Vídeos: são embeds (YouTube/Facebook) dentro do HTML do post — já vêm no content.
 *
 * Execução:
 *   $env:SUPABASE_SERVICE_ROLE_KEY="eyJ..."
 *   npx ts-node --skip-project scripts/migrate-wordpress.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as https from 'https'
import * as http from 'http'
import * as path from 'path'

// ─── Config ───────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://cnnqmguqbsdcojakslse.supabase.co'
const SUPABASE_SERVICE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubnFtZ3VxYnNkY29qYWtzbHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMzNDI2MiwiZXhwIjoyMDkyOTEwMjYyfQ.SR0YjyhMszTz5m-EP08IseU_QVJdPXgXl7dLXuCfdHU'
const WP_API = 'https://www.portaldosudoeste.com.br/v1/wp-json/wp/v2'
const STORAGE_BUCKET = 'media'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

async function fetchJson(url: string, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                headers: { 'User-Agent': 'PortalSudoeste-Migrator/1.0' },
                signal: AbortSignal.timeout(15000),
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return await res.json()
        } catch (err: any) {
            if (i < retries - 1) {
                await sleep(1500 * (i + 1))
            } else throw err
        }
    }
}

async function fetchBinary(url: string): Promise<Buffer | null> {
    return new Promise(resolve => {
        const proto = url.startsWith('https') ? https : http
        const req = proto.get(url, {
            headers: { 'User-Agent': 'PortalSudoeste-Migrator/1.0' },
            timeout: 20000,
        }, res => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                const redirectUrl = res.headers.location
                if (redirectUrl) return resolve(fetchBinary(redirectUrl))
            }
            if (!res.statusCode || res.statusCode >= 400) return resolve(null)
            const chunks: Buffer[] = []
            res.on('data', chunk => chunks.push(chunk))
            res.on('end', () => resolve(Buffer.concat(chunks)))
            res.on('error', () => resolve(null))
        })
        req.on('error', () => resolve(null))
        req.on('timeout', () => { req.destroy(); resolve(null) })
    })
}

function getMimeType(url: string): string {
    const ext = path.extname(url.split('?')[0]).toLowerCase()
    const mimeMap: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.mov': 'video/quicktime',
        '.avi': 'video/x-msvideo',
        '.pdf': 'application/pdf',
    }
    return mimeMap[ext] || 'image/jpeg'
}

// ─── Upload imagem para Supabase Storage ─────────────────────────────────────
async function uploadToSupabase(
    imageUrl: string,
    postId: number
): Promise<string | null> {
    try {
        const ext = path.extname(imageUrl.split('?')[0]).toLowerCase() || '.jpg'
        const storagePath = `posts/${postId}${ext}`

        // Verificar se já existe
        const { data: existing } = await supabase.storage
            .from(STORAGE_BUCKET)
            .list('posts', { search: `${postId}` })
        
        if (existing && existing.length > 0) {
            const { data } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(storagePath)
            return data.publicUrl
        }

        // Baixar imagem
        const buffer = await fetchBinary(imageUrl)
        if (!buffer || buffer.length === 0) return null

        // Upload para Supabase Storage
        const { error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(storagePath, buffer, {
                contentType: getMimeType(imageUrl),
                cacheControl: '31536000', // 1 ano de cache
                upsert: true,
            })

        if (error) return null

        const { data } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(storagePath)
        return data.publicUrl
    } catch {
        return null
    }
}

// ─── Migração de Categorias ───────────────────────────────────────────────────
async function migrateCategories(): Promise<Map<number, string>> {
    console.log('\n📁 Migrando categorias...')
    const categoryMap = new Map<number, string>()

    let page = 1
    while (true) {
        const data = await fetchJson(`${WP_API}/categories?per_page=100&page=${page}`)
        if (!data || data.length === 0) break

        const rows = data.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: stripHtml(cat.description || ''),
            count: cat.count,
        }))

        const { error } = await supabase.from('categories').upsert(rows, { onConflict: 'id' })
        if (error) console.error('  ❌ Categorias:', error.message)
        else {
            rows.forEach((r: any) => categoryMap.set(r.id, r.name))
            process.stdout.write(`\r  ✅ ${categoryMap.size} categorias migradas`)
        }

        if (data.length < 100) break
        page++
    }

    console.log(`\n  📊 Total: ${categoryMap.size} categorias`)
    return categoryMap
}

// ─── Migração de Posts + Imagens ─────────────────────────────────────────────
async function migratePosts(categoryMap: Map<number, string>) {
    console.log('\n📰 Descobrindo total de posts...')

    const firstRes = await fetch(`${WP_API}/posts?per_page=100&page=1&_embed`, {
        headers: { 'User-Agent': 'PortalSudoeste-Migrator/1.0' },
    })
    const totalPages = parseInt(firstRes.headers.get('X-WP-TotalPages') || '1')
    const totalPosts = parseInt(firstRes.headers.get('X-WP-Total') || '0')
    console.log(`  📊 ${totalPosts} posts em ${totalPages} páginas`)
    console.log(`  🖼️  Imagens serão baixadas e enviadas para Supabase Storage\n`)

    let migratedCount = 0
    let imageCount = 0
    let errorCount = 0

    for (let page = 1; page <= totalPages; page++) {
        try {
            const data: any[] = page === 1
                ? await firstRes.json()
                : await fetchJson(`${WP_API}/posts?per_page=100&page=${page}&_embed`)

            if (!data || data.length === 0) break

            const rows = await Promise.all(
                data.map(async (post: any) => {
                    const categoryIds: number[] = post.categories || []
                    const categoryName = categoryIds.length > 0
                        ? (categoryMap.get(categoryIds[0]) || 'Notícias')
                        : 'Notícias'

                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
                    const originalImageUrl =
                        featuredMedia?.source_url ||
                        featuredMedia?.media_details?.sizes?.large?.source_url ||
                        featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
                        ''

                    // Upload imagem para Supabase Storage
                    let supabaseImageUrl: string | null = null
                    if (originalImageUrl) {
                        supabaseImageUrl = await uploadToSupabase(originalImageUrl, post.id)
                        if (supabaseImageUrl) imageCount++
                    }

                    const authorName = post._embedded?.['author']?.[0]?.name || 'Redação Portal'
                    const tagObjects = post._embedded?.['wp:term']?.[1] || []
                    const tags = tagObjects.map((t: any) => t.name)
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
                        image_url: supabaseImageUrl || originalImageUrl,
                        supabase_image_url: supabaseImageUrl,
                        featured: false,
                        views: post.sticky ? 100 : 0,
                        tags: tags.length > 0 ? tags : null,
                    }
                })
            )

            // Upsert batch no Supabase
            const { error } = await supabase
                .from('posts')
                .upsert(rows, { onConflict: 'id' })

            if (error) {
                console.error(`\n  ❌ Erro página ${page}: ${error.message}`)
                errorCount += rows.length
            } else {
                migratedCount += rows.length
            }

            const progress = Math.round((page / totalPages) * 100)
            process.stdout.write(
                `\r  📄 [${progress}%] Página ${page}/${totalPages} | Posts: ${migratedCount} | Imagens: ${imageCount} | Erros: ${errorCount}`
            )

            // Rate limiting entre páginas
            await sleep(500)
        } catch (err: any) {
            console.error(`\n  ❌ Erro página ${page}: ${err.message}`)
            errorCount++
            await sleep(3000)
        }
    }

    console.log(`\n\n✅ Migração de posts concluída!`)
    console.log(`   Posts migrados:  ${migratedCount}`)
    console.log(`   Imagens no Storage: ${imageCount}`)
    console.log(`   Erros:           ${errorCount}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    console.log('╔══════════════════════════════════════════════════╗')
    console.log('║   Portal do Sudoeste — Migração WordPress→Supabase ║')
    console.log('╚══════════════════════════════════════════════════╝')
    console.log(`\n  Origem:  ${WP_API}`)
    console.log(`  Destino: ${SUPABASE_URL}`)
    console.log(`  Storage: ${STORAGE_BUCKET}/`)

    const startTime = Date.now()

    const categoryMap = await migrateCategories()
    await migratePosts(categoryMap)

    const elapsed = Math.round((Date.now() - startTime) / 1000)
    const h = Math.floor(elapsed / 3600)
    const m = Math.floor((elapsed % 3600) / 60)
    const s = elapsed % 60
    console.log(`\n⏱️  Tempo total: ${h}h ${m}m ${s}s`)
    console.log('🎉 Banco de dados do Portal do Sudoeste pronto!')
}

main().catch(err => {
    console.error('\n💥 Erro fatal:', err)
    process.exit(1)
})
