import type { Metadata } from "next"
import { ARTICLES, getArticleBySlug } from "@/lib/data/articles"
import { ArticleDetail } from "@/components/news/ArticleDetail"
import { notFound } from "next/navigation"
import { SITE_CONFIG } from "@/lib/constants"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const article = getArticleBySlug(slug)

    if (!article) return { title: "Notícia não encontrada" }

    return {
        title: `${article.title} | Portal do Sudoeste`,
        description: article.summary,
        keywords: article.tags,
        openGraph: {
            title: article.title,
            description: article.summary,
            type: "article",
            publishedTime: article.date,
            authors: [article.author],
            images: [{ url: article.image, width: 1200, height: 630 }],
            siteName: SITE_CONFIG.name,
            url: `${SITE_CONFIG.url}/noticia/${article.slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.summary,
            images: [article.image],
        },
    }
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params
    const article = getArticleBySlug(slug)

    if (!article) {
        notFound()
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.summary,
        image: article.image,
        datePublished: article.date,
        author: { "@type": "Person", name: article.author },
        publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    }

    return (
        <div className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4">
                <ArticleDetail article={article} />
            </div>
        </div>
    )
}
