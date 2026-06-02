"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageSquare, Trash2, Mail, User, Clock, Search } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function AdminMensagensPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")

    useEffect(() => {
        loadMessages()
    }, [])

    async function loadMessages() {
        setLoading(true)
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (data) setMessages(data)
        setLoading(false)
    }

    async function handleDelete(id: number) {
        if (!confirm("Deseja realmente excluir esta mensagem?")) return
        
        const { error } = await supabase.from('contacts').delete().eq('id', id)
        if (!error) loadMessages()
    }

    const filteredMessages = messages.filter(m => 
        m.name?.toLowerCase().includes(query.toLowerCase()) ||
        m.email?.toLowerCase().includes(query.toLowerCase()) ||
        m.subject?.toLowerCase().includes(query.toLowerCase()) ||
        m.message?.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Mensagens de Contato</h1>
                
                <div className="relative w-full max-w-sm">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filtrar mensagens..."
                        className="w-full pl-9 pr-4 py-1.5 text-[13px] border border-[#c3c4c7] rounded-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8f94]" />
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="bg-white border border-[#c3c4c7] p-8 text-center text-[#646970]">
                        Carregando mensagens...
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="bg-white border border-[#c3c4c7] p-12 text-center text-[#646970]">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>{query ? 'Nenhuma mensagem encontrada para esta busca.' : 'Nenhuma mensagem recebida ainda.'}</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div key={msg.id} className="bg-white border border-[#c3c4c7] shadow-sm overflow-hidden flex flex-col md:flex-row">
                            <div className="p-4 md:w-64 bg-[#f6f7f7] border-b md:border-b-0 md:border-r border-[#c3c4c7] space-y-2 shrink-0">
                                <div className="flex items-center gap-2 text-[#1d2327] font-bold">
                                    <User className="w-3.5 h-3.5 text-[#a7aaad]" />
                                    <span className="truncate">{msg.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[12px] text-[#2271b1] hover:underline">
                                    <Mail className="w-3.5 h-3.5 text-[#a7aaad]" />
                                    <a href={`mailto:${msg.email}`} className="truncate">{msg.email}</a>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-[#646970]">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{format(new Date(msg.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                                </div>
                                <button 
                                    onClick={() => handleDelete(msg.id)}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 text-[11px] font-bold pt-2"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Excluir mensagem
                                </button>
                            </div>
                            <div className="p-5 flex-1 min-w-0">
                                <h3 className="font-bold text-[#1d2327] mb-2 text-base">{msg.subject}</h3>
                                <p className="text-[#3c434a] whitespace-pre-wrap leading-relaxed text-[13px]">
                                    {msg.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
