import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/data/articles"
import { SITE_CONFIG } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
        { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/anuncie`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/equipe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
        { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ]

    const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
        url: `${baseUrl}/noticia/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }))

    const categoryPages: MetadataRoute.Sitemap = SITE_CONFIG.categories.map((cat) => ({
        url: `${baseUrl}/categoria/${cat.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
    }))

    const cityPages: MetadataRoute.Sitemap = SITE_CONFIG.cities.map((city) => ({
        url: `${baseUrl}/cidade/${city.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
    }))

    return [...staticPages, ...articlePages, ...categoryPages, ...cityPages]
}
