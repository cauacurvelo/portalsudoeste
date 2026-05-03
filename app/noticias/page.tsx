import type { Metadata } from "next"
import { getLatestArticles } from "@/lib/data/articles-db"
import { ArticleCard } from "@/components/news/ArticleCard"

export const metadata: Metadata = {
    title: "Últimas Notícias | Portal do Sudoeste",
    description: "Acompanhe as últimas notícias e novidades da região Sudoeste da Bahia.",
}

export default async function NoticiasPage() {
    // Fetch a larger chunk for the "all news" page
    const articles = await getLatestArticles(24)

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 border-b-4 border-brand-red pb-4">
                <h1 className="text-4xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter">
                    Últimas Notícias
                </h1>
                <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest">
                    Acompanhe tudo que está acontecendo na região Sudoeste
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {articles.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-gray-400 font-medium">Nenhuma notícia encontrada no momento.</p>
                </div>
            )}
            
            <div className="mt-12 text-center">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Mais notícias são atualizadas diariamente
                </p>
            </div>
        </div>
    )
}
