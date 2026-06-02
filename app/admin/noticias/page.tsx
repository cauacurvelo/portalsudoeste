import { getAdminArticles } from "@/lib/data/articles-db"
import { MessageSquare, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { DeletePostButton } from "@/components/admin/DeletePostButton"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

export default async function AdminNoticiasPage({
    searchParams,
}: {
    searchParams: Promise<{ created?: string; q?: string; page?: string }>
}) {
    const params = await searchParams
    const query = typeof params.q === 'string' ? params.q : ''
    const currentPage = params.page ? parseInt(params.page) : 1
    const limit = 20

    const { articles, total } = await getAdminArticles({ 
        query, 
        page: currentPage, 
        limit 
    })

    const totalPages = Math.ceil(total / limit)

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Posts</h1>
                    <Link href="/admin/noticias/nova" className="bg-[#2271b1] text-white px-3 py-1.5 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors">
                        Adicionar novo
                    </Link>
                </div>

                <form className="relative flex-1 max-w-sm">
                    <input 
                        type="text" 
                        name="q"
                        defaultValue={query}
                        placeholder="Pesquisar posts..."
                        className="w-full pl-9 pr-4 py-1.5 text-[13px] border border-[#c3c4c7] rounded-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8f94]" />
                </form>
            </div>

            {params.created && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-sm text-sm flex items-center gap-2">
                    ✅ Notícia publicada com sucesso!{" "}
                    <Link href={`/noticia/${params.created}`} target="_blank" className="underline font-semibold">
                        Ver no site →
                    </Link>
                </div>
            )}

            {/* Status Links */}
            <div className="flex items-center justify-between text-[13px]">
                <ul className="flex text-[#2271b1] gap-1">
                    <li>
                        <span className="text-[#1d2327] font-semibold">
                            Tudo <span className="text-[#646970] font-normal">({total})</span>
                        </span>
                    </li>
                </ul>
                
                {/* Simple Pagination Controls */}
                <div className="flex items-center gap-2">
                    <span className="text-[#646970]">{total} itens</span>
                    <div className="flex items-center gap-1 ml-4">
                        <Link 
                            href={`/admin/noticias?page=${Math.max(1, currentPage - 1)}${query ? `&q=${query}` : ''}`}
                            className={`p-1 border border-[#c3c4c7] rounded-sm bg-white hover:bg-gray-50 transition-colors ${currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                        <span className="px-2 font-medium">{currentPage} de {totalPages || 1}</span>
                        <Link 
                            href={`/admin/noticias?page=${Math.min(totalPages, currentPage + 1)}${query ? `&q=${query}` : ''}`}
                            className={`p-1 border border-[#c3c4c7] rounded-sm bg-white hover:bg-gray-50 transition-colors ${currentPage >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm overflow-x-auto">
                <table className="w-full text-left text-[13px] text-[#3c434a]">
                    <thead>
                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Título</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Autor</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Categoria</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327] w-12 text-center">
                                <MessageSquare className="w-4 h-4 inline-block text-[#8c8f94]" />
                            </th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-[#f6f7f7] group">
                                <td className="py-2 px-3 align-top">
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/admin/noticias/${article.id}/editar`}
                                            className="text-[#2271b1] font-bold text-[14px] hover:underline block mb-1 line-clamp-2"
                                        >
                                            {article.title.startsWith("[RASCUNHO]") 
                                                ? article.title.replace("[RASCUNHO]", "").trim() 
                                                : article.title
                                            }
                                        </Link>
                                        <div className="invisible group-hover:visible flex gap-2 text-[12px] font-normal">
                                            <Link href={`/admin/noticias/${article.id}/editar`} className="text-[#2271b1] hover:underline">
                                                Editar
                                            </Link>
                                            {" | "}
                                            <DeletePostButton articleId={article.id} articleTitle={article.title} />
                                            {" | "}
                                            <Link href={`/noticia/${article.slug}`} target="_blank" className="text-[#2271b1] hover:underline">
                                                Ver no site
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-3 align-top text-[#646970]">{article.author}</td>
                                <td className="py-2 px-3 align-top">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="py-2 px-3 align-top text-center text-[#646970]">{article.views || 0}</td>
                                <td className="py-2 px-3 align-top whitespace-nowrap">
                                    {article.title.startsWith("[RASCUNHO]") ? (
                                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded block w-fit mb-0.5 border border-gray-200 uppercase">
                                            Rascunho
                                        </span>
                                    ) : (
                                        <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded block w-fit mb-0.5 border border-green-200 uppercase">
                                            Publicado
                                        </span>
                                    )}
                                    <span className="text-[#646970]">
                                        {format(new Date(article.date), "dd/MM/yyyy", { locale: ptBR })}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-[13px] text-[#3c434a] text-right">
                Exibindo {articles.length} de {total} notícias
            </div>
        </div>
    )
}
