import { FileText, Code } from "lucide-react"

export default function PaginasPage() {
    const paginasFixas = [
        { titulo: "Home (Página Inicial)", slug: "/", status: "Publicada" },
        { titulo: "Sobre o Portal", slug: "/sobre", status: "Publicada" },
        { titulo: "Equipe", slug: "/equipe", status: "Publicada" },
        { titulo: "Fale Conosco", slug: "/contato", status: "Publicada" },
        { titulo: "Anuncie", slug: "/anuncie", status: "Publicada" },
        { titulo: "Política de Privacidade", slug: "/privacidade", status: "Publicada" },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Páginas Institucionais</h1>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-yellow-800 flex gap-3">
                <Code className="w-5 h-5 shrink-0" />
                <div className="text-sm">
                    <p className="font-bold">Aviso sobre o novo sistema</p>
                    <p>Por questões de otimização extrema e velocidade no Google, as páginas institucionais do novo Portal Sudoeste são "Páginas Estáticas" codificadas diretamente na infraestrutura. Para alterar textos grandes nessas páginas, entre em contato com a equipe de engenharia.</p>
                </div>
            </div>

            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm overflow-hidden">
                <table className="w-full text-left text-[13px] text-[#3c434a]">
                    <thead>
                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                            <th className="py-3 px-4 font-bold text-[#1d2327]">Título da Página</th>
                            <th className="py-3 px-4 font-bold text-[#1d2327]">Rota (URL)</th>
                            <th className="py-3 px-4 font-bold text-[#1d2327]">Status</th>
                            <th className="py-3 px-4 font-bold text-[#1d2327] text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                        {paginasFixas.map((pagina) => (
                            <tr key={pagina.slug} className="hover:bg-[#f6f7f7]">
                                <td className="py-3 px-4 font-bold text-[#2271b1] flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    {pagina.titulo}
                                </td>
                                <td className="py-3 px-4 text-gray-500">
                                    {pagina.slug}
                                </td>
                                <td className="py-3 px-4">
                                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">
                                        {pagina.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <a 
                                        href={pagina.slug} 
                                        target="_blank"
                                        className="text-[#2271b1] hover:underline"
                                    >
                                        Ver Página
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
