import type { Metadata } from "next"
import { getArticlesByCity } from "@/lib/data/articles"
import { ArticleCard } from "@/components/news/ArticleCard"
import { SITE_CONFIG } from "@/lib/constants"
import { deslugify, slugify } from "@/lib/utils"
interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return SITE_CONFIG.cities.map((city) => ({ slug: city.toLowerCase().replace(/\s+/g, '-') }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const cityName = SITE_CONFIG.cities.find(c => slugify(c) === slug) || deslugify(slug)
    return {
        title: `Notícias de ${cityName} | Portal do Sudoeste`,
        description: `Acompanhe as últimas notícias de ${cityName}. Tudo o que acontece em ${cityName} você encontra no Portal do Sudoeste.`,
    }
}

export default async function CityPage({ params }: PageProps) {
    const { slug } = await params
    const cityName = SITE_CONFIG.cities.find(c => slugify(c) === slug) || deslugify(slug)
    const cityArticles = getArticlesByCity(slug)

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 border-b-4 border-brand-blue-primary pb-4">
                <h1 className="text-4xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter">
                    {cityName}
                </h1>
                <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest">
                    O que acontece em {cityName} você encontra primeiro aqui
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {cityArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {cityArticles.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-gray-400 font-medium">Não encontramos notícias recentes para esta cidade.</p>
                </div>
            )}
        </div>
    )
}
