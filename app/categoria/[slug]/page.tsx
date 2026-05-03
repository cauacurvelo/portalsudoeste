import type { Metadata } from "next"
import { getArticlesByCategory } from "@/lib/data/articles-db"
import { ArticleCard } from "@/components/news/ArticleCard"
import { SITE_CONFIG } from "@/lib/constants"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return SITE_CONFIG.categories.map((cat) => ({ slug: cat.toLowerCase() }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)
    return {
        title: `${categoryName} | Portal do Sudoeste`,
        description: `Últimas notícias de ${categoryName} no Portal do Sudoeste. Acompanhe tudo sobre ${categoryName} na região Sudoeste da Bahia.`,
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params
    const categoryArticles = await getArticlesByCategory(slug)

    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 border-b-4 border-brand-red pb-4">
                <h1 className="text-4xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter">
                    {categoryName}
                </h1>
                <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest">
                    Acompanhe as últimas notícias de {categoryName} no Portal do Sudoeste
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {categoryArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {categoryArticles.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-gray-400 font-medium">Nenhuma notícia encontrada nesta categoria no momento.</p>
                </div>
            )}
        </div>
    )
}
