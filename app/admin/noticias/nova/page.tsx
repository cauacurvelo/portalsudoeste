"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Eye,
    ChevronUp,
    ChevronDown
} from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import Link from "next/link"

export default function NewArticlePage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            alert("Notícia publicada com sucesso!")
            router.push("/admin/noticias")
        }, 1500)
    }

    return (
        <div className="space-y-4 pb-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Adicionar novo post</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
                {/* Main Content Area */}
                <div className="flex-1 space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Adicionar título"
                            className="w-full text-[20px] p-2 border border-[#c3c4c7] rounded-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none placeholder:text-[#8c8f94]"
                        />
                    </div>
                    
                    <div>
                        <button className="bg-[#f6f7f7] text-[#1d2327] border border-[#c3c4c7] px-3 py-1 text-[13px] rounded-sm hover:bg-[#f0f0f1] transition-colors mb-2 flex items-center gap-2">
                            <span className="text-[16px] font-bold">+</span> Adicionar Mídia
                        </button>
                        <div className="border border-[#c3c4c7] bg-white rounded-sm">
                            {/* Editor Toolbar */}
                            <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] p-2 flex gap-1 items-center">
                                {['B', 'I', 'U', 'S', 'quote', 'list-ul', 'list-ol', 'link'].map(btn => (
                                    <button key={btn} className="w-8 h-8 flex items-center justify-center text-[#3c434a] hover:bg-[#c3c4c7] hover:text-[#1d2327] rounded-sm font-serif">
                                        {btn === 'quote' ? '"' : btn === 'list-ul' ? '≡' : btn === 'list-ol' ? '1.' : btn === 'link' ? '🔗' : btn}
                                    </button>
                                ))}
                                <div className="ml-auto text-[13px] text-[#2271b1]">Visual → Text</div>
                            </div>
                            <textarea
                                placeholder="Comece a escrever..."
                                className="w-full h-[400px] p-4 border-none outline-none resize-y text-[14px] text-[#3c434a] focus:ring-0"
                            />
                        </div>
                    </div>
                    
                    <div className="bg-white border border-[#c3c4c7] shadow-sm">
                        <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                            <h3 className="font-semibold text-[14px] text-[#1d2327]">Resumo (Linha de Apoio)</h3>
                            <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                        </div>
                        <div className="p-3">
                            <textarea rows={3} className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"></textarea>
                            <p className="text-[12px] text-[#646970] mt-1">Resumos são opcionais, mas podem ser exibidos no card da notícia.</p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[280px] shrink-0 space-y-4">
                    {/* Publicar Metabox */}
                    <div className="bg-white border border-[#c3c4c7] shadow-sm">
                        <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                            <h3 className="font-semibold text-[14px] text-[#1d2327]">Publicar</h3>
                            <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                        </div>
                        <div className="p-3 border-b border-[#c3c4c7] space-y-3 text-[13px] text-[#3c434a]">
                            <div className="flex justify-between">
                                <button className="bg-[#f6f7f7] border border-[#2271b1] text-[#2271b1] px-3 py-1 rounded-sm hover:bg-[#f0f0f1]">Salvar rascunho</button>
                                <button className="bg-[#f6f7f7] border border-[#c3c4c7] text-[#3c434a] px-3 py-1 rounded-sm hover:bg-[#f0f0f1]">Visualizar</button>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-[#a7aaad]" /> Estado: <b>Rascunho</b> <span className="text-[#2271b1] underline ml-auto">Editar</span></div>
                                <div className="flex items-center gap-2"><span className="w-4 text-center">👁️</span> Visibilidade: <b>Público</b> <span className="text-[#2271b1] underline ml-auto">Editar</span></div>
                                <div className="flex items-center gap-2"><span className="w-4 text-center">📅</span> Publicar <b>imediatamente</b> <span className="text-[#2271b1] underline ml-auto">Editar</span></div>
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#f0f0f1]"><input type="checkbox" className="border-[#8c8f94]" /> <b>Destaque na página inicial</b></div>
                            </div>
                        </div>
                        <div className="bg-[#f6f7f7] p-3 flex items-center justify-between">
                            <button className="text-[#d63638] text-[13px] hover:underline">Mover para lixeira</button>
                            <button onClick={handleSave} disabled={loading} className="bg-[#2271b1] text-white px-4 py-1 rounded-sm hover:bg-[#135e96] border border-[#2271b1] text-[13px] font-semibold">
                                {loading ? "Publicando..." : "Publicar"}
                            </button>
                        </div>
                    </div>

                    {/* Categorias Metabox */}
                    <div className="bg-white border border-[#c3c4c7] shadow-sm">
                        <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                            <h3 className="font-semibold text-[14px] text-[#1d2327]">Categorias</h3>
                            <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                        </div>
                        <div className="p-3 text-[13px]">
                            <ul className="space-y-2 max-h-[150px] overflow-y-auto border border-[#c3c4c7] p-2 bg-white">
                                {SITE_CONFIG.categories.map(cat => (
                                    <li key={cat} className="flex items-center gap-2">
                                        <input type="checkbox" id={`cat-${cat}`} className="border-[#8c8f94]" />
                                        <label htmlFor={`cat-${cat}`}>{cat}</label>
                                    </li>
                                ))}
                            </ul>
                            <button className="text-[#2271b1] mt-3 underline flex items-center gap-1">+ Adicionar nova categoria</button>
                        </div>
                    </div>

                    {/* Cidades Metabox */}
                    <div className="bg-white border border-[#c3c4c7] shadow-sm">
                        <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                            <h3 className="font-semibold text-[14px] text-[#1d2327]">Cidades (Região)</h3>
                            <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                        </div>
                        <div className="p-3 text-[13px]">
                            <select className="w-full border border-[#8c8f94] p-1.5 focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none">
                                <option>Selecione uma cidade</option>
                                {SITE_CONFIG.cities.map(city => (
                                    <option key={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Imagem Destacada Metabox */}
                    <div className="bg-white border border-[#c3c4c7] shadow-sm">
                        <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                            <h3 className="font-semibold text-[14px] text-[#1d2327]">Imagem destacada</h3>
                            <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                        </div>
                        <div className="p-3 text-[13px]">
                            <button className="text-[#2271b1] underline hover:text-[#135e96]">Definir imagem destacada</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
