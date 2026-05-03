import { supabase } from '@/lib/supabase'
import { cache } from 'react'

// ─── Tipagem ──────────────────────────────────────────────────────────────────
export interface Article {
    id: string
    slug: string
    title: string
    summary: string
    content: string
    category: string
    city?: string
    author: string
    date: string
    image: string
    featured?: boolean
    views: number
    tags?: string[]
}

// Converte row do Supabase para o formato Article do front-end
function toArticle(row: any): Article {
    return {
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        summary: row.summary || '',
        content: row.content || '',
        category: row.category || 'Notícias',
        city: row.city || undefined,
        author: row.author || 'Redação Portal',
        date: row.date,
        image: row.image_url || `https://picsum.photos/seed/${row.id}/800/600`,
        featured: row.featured || false,
        views: row.views || 0,
        tags: row.tags || [],
    }
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const getLatestArticles = cache(async (limit = 6): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

export const getFeaturedArticles = cache(async (limit = 5): Promise<Article[]> => {
    // Pega as mais recentes com imagem (equivalente a "destaque")
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .not('image_url', 'is', null)
        .neq('image_url', '')
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

export const getMostReadArticles = cache(async (limit = 5): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('views', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) return null
    return toArticle(data)
})

export const getArticlesByCategory = cache(async (category: string, limit = 12): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('category', `%${category}%`)
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

export const getArticlesByCity = cache(async (city: string, limit = 12): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('city', `%${city}%`)
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

export const getRelatedArticles = cache(async (article: Article, limit = 3): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .neq('id', parseInt(article.id))
        .or(`category.ilike.%${article.category}%${article.city ? `,city.ilike.%${article.city}%` : ''}`)
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

export async function searchArticles(query: string, limit = 20): Promise<Article[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
}

export async function getTotalArticleCount(): Promise<number> {
    const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
    return count || 0
}

export const getArticlesWithVideo = cache(async (limit = 4): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('content', '%<iframe%youtube%')
        .order('date', { ascending: false })
        .limit(limit)

    if (error || !data) return []
    return data.map(toArticle)
})

// ─── Incrementar visualizações ────────────────────────────────────────────────
export async function incrementViews(id: string) {
    await supabase.rpc('increment_views', { post_id: parseInt(id) })
}
