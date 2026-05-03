import { getLatestArticles } from "@/lib/data/articles-db"
import { ArticleCard } from "@/components/news/ArticleCard"

export async function LatestNews() {
    const latest = await getLatestArticles(6)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latest.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    )
}
