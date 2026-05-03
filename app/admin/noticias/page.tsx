import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getLatestArticles, getTotalArticleCount } from "@/lib/data/articles-db"
import { MessageSquare } from "lucide-react"

export default async function AdminNoticiasPage() {
    const articles = await getLatestArticles(50)
    const totalCount = await getTotalArticleCount()

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Posts</h1>
                <Link href="/admin/noticias/nova" className="bg-[#2271b1] text-white px-3 py-1.5 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors">
                    Adicionar novo
                </Link>
            </div>

            {/* Status Links */}
            <ul className="flex text-[13px] text-[#2271b1] mb-2 gap-1">
                <li><Link href="#" className="text-[#1d2327] font-semibold">Tudo <span className="text-[#646970] font-normal">({totalCount})</span></Link> | </li>
                <li><Link href="#" className="hover:underline">Publicados <span className="text-[#646970]">({totalCount})</span></Link></li>
            </ul>

            {/* Filter Bar */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <select className="border border-[#8c8f94] p-1 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none rounded-sm">
                        <option>Ações em massa</option>
                        <option>Editar</option>
                        <option>Mover para a lixeira</option>
                    </select>
                    <button className="border border-[#2271b1] text-[#2271b1] px-3 py-1 text-[13px] rounded-sm hover:bg-[#f0f0f1]">Aplicar</button>

                    <select className="border border-[#8c8f94] p-1 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none rounded-sm ml-2">
                        <option>Todas as datas</option>
                        <option>Abril 2026</option>
                    </select>
                    <select className="border border-[#8c8f94] p-1 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none rounded-sm">
                        <option>Todas as categorias</option>
                        <option>Policial</option>
                        <option>Política</option>
                    </select>
                    <button className="border border-[#2271b1] text-[#2271b1] px-3 py-1 text-[13px] rounded-sm hover:bg-[#f0f0f1]">Filtrar</button>
                </div>

                <div className="flex items-center gap-2">
                    <input type="text" className="border border-[#8c8f94] p-1 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none rounded-sm w-48" />
                    <button className="border border-[#2271b1] text-[#2271b1] px-3 py-1 text-[13px] rounded-sm hover:bg-[#f0f0f1]">Pesquisar posts</button>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm">
                <table className="w-full text-left text-[13px] text-[#3c434a]">
                    <thead>
                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                            <th className="py-2 px-3 w-8"><input type="checkbox" className="border-[#8c8f94]" /></th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Título</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Autor</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Categorias</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Tags</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327] w-12 text-center"><MessageSquare className="w-4 h-4 inline-block text-[#8c8f94]" /></th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-[#f6f7f7] group">
                                <td className="py-2 px-3 align-top"><input type="checkbox" className="border-[#8c8f94]" /></td>
                                <td className="py-2 px-3 align-top">
                                    <Link href={`/admin/noticias/nova`} className="text-[#2271b1] font-bold text-[14px] hover:underline block mb-1">
                                        {article.title}
                                    </Link>
                                    <div className="invisible group-hover:visible flex gap-2 text-[13px]">
                                        <Link href="#" className="text-[#2271b1] hover:underline">Editar</Link> | 
                                        <Link href="#" className="text-[#d63638] hover:underline">Lixeira</Link> | 
                                        <Link href={`/noticia/${article.slug}`} target="_blank" className="text-[#2271b1] hover:underline">Ver</Link>
                                    </div>
                                </td>
                                <td className="py-2 px-3 align-top text-[#2271b1] hover:underline cursor-pointer">{article.author}</td>
                                <td className="py-2 px-3 align-top text-[#2271b1] hover:underline cursor-pointer">{article.category}</td>
                                <td className="py-2 px-3 align-top">—</td>
                                <td className="py-2 px-3 align-top text-center">—</td>
                                <td className="py-2 px-3 align-top">
                                    Publicado<br/>
                                    <span className="text-[#646970]">{format(new Date(article.date), "dd/MM/yyyy", { locale: ptBR })}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-[#c3c4c7] bg-[#f6f7f7]">
                            <th className="py-2 px-3 w-8"><input type="checkbox" className="border-[#8c8f94]" /></th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Título</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Autor</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Categorias</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Tags</th>
                            <th className="py-2 px-3 font-normal text-[#1d2327] w-12 text-center"><MessageSquare className="w-4 h-4 inline-block text-[#8c8f94]" /></th>
                            <th className="py-2 px-3 font-normal text-[#1d2327]">Data</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <select className="border border-[#8c8f94] p-1 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none rounded-sm">
                        <option>Ações em massa</option>
                        <option>Editar</option>
                        <option>Mover para a lixeira</option>
                    </select>
                    <button className="border border-[#2271b1] text-[#2271b1] px-3 py-1 text-[13px] rounded-sm hover:bg-[#f0f0f1]">Aplicar</button>
                </div>
                <div className="text-[13px] text-[#3c434a]">
                    {totalCount} itens
                </div>
            </div>
        </div>
    )
}
