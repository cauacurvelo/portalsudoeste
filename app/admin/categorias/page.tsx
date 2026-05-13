"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Folder, AlertCircle } from "lucide-react"

export default function CategoriasPage() {
    const [categories, setCategories] = useState<{name: string, count: number}[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCategories() {
            // No Portal Sudoeste, as categorias são derivadas da tabela de posts
            const { data, error } = await supabase.from('posts').select('category')
            
            if (data && !error) {
                const counts: Record<string, number> = {}
                data.forEach(post => {
                    const cat = post.category || 'Sem Categoria'
                    counts[cat] = (counts[cat] || 0) + 1
                })
                
                const formatted = Object.keys(counts).map(name => ({
                    name,
                    count: counts[name]
                })).sort((a, b) => b.count - a.count)
                
                setCategories(formatted)
            }
            setLoading(false)
        }
        fetchCategories()
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Categorias</h1>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 flex gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <div className="text-sm">
                    <p className="font-bold">Como funcionam as categorias?</p>
                    <p>No novo Portal Sudoeste, as categorias são criadas automaticamente assim que você digita o nome delas na hora de escrever uma nova Notícia. Não é necessário cadastrá-las previamente aqui.</p>
                </div>
            </div>

            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm overflow-hidden">
                <table className="w-full text-left text-[13px] text-[#3c434a]">
                    <thead>
                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                            <th className="py-3 px-4 font-bold text-[#1d2327]">Nome da Categoria</th>
                            <th className="py-3 px-4 font-bold text-[#1d2327]">Slug (URL)</th>
                            <th className="py-3 px-4 font-bold text-[#1d2327] text-right">Total de Notícias</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="py-8 text-center text-gray-500">Buscando categorias em uso...</td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="py-8 text-center text-gray-500">Nenhuma categoria encontrada.</td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.name} className="hover:bg-[#f6f7f7]">
                                    <td className="py-3 px-4 font-bold text-[#2271b1] flex items-center gap-2">
                                        <Folder className="w-4 h-4 text-gray-400" />
                                        {cat.name}
                                    </td>
                                    <td className="py-3 px-4 text-gray-500">
                                        {cat.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}
                                    </td>
                                    <td className="py-3 px-4 text-right font-medium">
                                        {cat.count}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
