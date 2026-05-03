import { searchArticles } from "@/lib/data/articles-db"
import { ArticleCard } from "@/components/news/ArticleCard"
import { Search as SearchIcon } from "lucide-react"

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const query = typeof params.q === "string" ? params.q : ""

    const results = query ? await searchArticles(query) : []

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 border-b-2 border-gray-100 pb-8 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-black text-brand-blue-primary">
                        {query ? `Resultados para: "${query}"` : "Busca"}
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">
                        {query ? `Encontramos ${results.length} coincidências para sua busca` : "Digite um termo para buscar"}
                    </p>
                </div>
                {query && (
                    <div className="w-full md:w-64 h-12 bg-gray-50 flex items-center px-4 rounded-sm border border-gray-100 italic text-gray-400 text-sm">
                        <SearchIcon className="w-4 h-4 mr-3 shrink-0" /> <span className="truncate">{query}</span>
                    </div>
                )}
            </header>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {results.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : query ? (
                <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                        <SearchIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">Ops! Não encontramos nada relacionado a "{query}".</p>
                    <p className="text-sm text-gray-400">Tente buscar por termos mais genéricos ou verifique a ortografia.</p>
                </div>
            ) : null}
        </div>
    )
}
