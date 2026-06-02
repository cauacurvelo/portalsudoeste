"use client"

import { useState, useEffect } from "react"
import { Tags, AlertCircle, TrendingUp } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function TagsPage() {
    const [tags, setTags] = useState<{name: string, count: number}[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTags() {
            const { data } = await supabase.from('posts').select('tags')
            if (data) {
                const tagCounts: Record<string, number> = {}
                data.forEach(post => {
                    if (Array.isArray(post.tags)) {
                        post.tags.forEach((tag: string) => {
                            const t = tag.trim().toLowerCase()
                            if (t) tagCounts[t] = (tagCounts[t] || 0) + 1
                        })
                    }
                })
                
                const sortedTags = Object.keys(tagCounts).map(name => ({
                    name,
                    count: tagCounts[name]
                })).sort((a, b) => b.count - a.count)
                
                setTags(sortedTags)
            }
            setLoading(false)
        }
        fetchTags()
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Tags (Palavras-chave)</h1>

            <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-sm border border-blue-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
                <div>
                    <strong>Gerenciamento Inteligente:</strong> As tags são extraídas automaticamente de suas matérias. Abaixo você vê as palavras-chave que mais geram tráfego e conexão para o seu portal no Google.
                </div>
            </div>

            {loading ? (
                <div className="bg-white border border-[#c3c4c7] p-12 text-center text-gray-500">
                    Buscando palavras-chave...
                </div>
            ) : tags.length === 0 ? (
                <div className="bg-white border border-[#c3c4c7] p-12 text-center text-gray-400">
                    <Tags className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Nenhuma tag em uso no momento.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tags.slice(0, 30).map((tag, idx) => (
                        <div key={tag.name} className="bg-white border border-[#c3c4c7] shadow-sm p-4 flex items-center justify-between hover:border-[#2271b1] transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <span className="text-[10px] font-bold text-gray-400">#{idx + 1}</span>
                                </div>
                                <span className="font-bold text-[#2271b1]">{tag.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                {tag.count} posts
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
