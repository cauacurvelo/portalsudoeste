import { getLatestArticles } from "@/lib/data/articles"
import { ArticleCard } from "@/components/news/ArticleCard"

export function LatestNews() {
    const latest = getLatestArticles(6)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latest.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    )
}

