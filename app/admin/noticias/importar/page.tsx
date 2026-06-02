"use client"

import { useState } from "react"
import { bulkImportAction } from "@/lib/actions/posts"
import { useRouter } from "next/navigation"

export default function AdminImportPage() {
    const [json, setJson] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const router = useRouter()

    async function handleImport(e: React.FormEvent) {
        e.preventDefault()
        if (!json.trim()) return

        setLoading(true)
        setMessage("")
        
        try {
            const res = await bulkImportAction(json)
            if (res.error) {
                setMessage("❌ Erro: " + res.error)
            } else {
                setMessage(`✅ Sucesso! Foram adicionadas ${res.added} notícias. Redirecionando...`)
                setTimeout(() => {
                    router.push("/admin/noticias")
                }, 2000)
            }
        } catch (error: any) {
            setMessage("❌ Ocorreu um erro ao processar a importação: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Importação Rápida de Notícias</h1>
            
            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm p-6 max-w-4xl">
                <p className="mb-4 text-sm text-[#3c434a]">
                    Cole abaixo um array JSON com as notícias para realizar a importação em lote.
                    Exemplo do formato:
                </p>
                <pre className="bg-gray-50 p-4 rounded-sm text-xs text-gray-600 mb-6 border border-gray-200 overflow-x-auto">
{`[
  {
    "title": "Título da Notícia",
    "category": "Cultura",
    "city": "Jequié",
    "image_url": "https://images.unsplash.com/...",
    "summary": "Um breve resumo...",
    "content": "<p>Conteúdo HTML completo da notícia.</p>",
    "tags": ["tag1", "tag2"],
    "featured": true
  }
]`}
                </pre>

                {message && (
                    <div className={message.startsWith("✅") ? "p-4 mb-6 rounded-sm text-sm bg-green-50 text-green-700 border border-green-200" : "p-4 mb-6 rounded-sm text-sm bg-red-50 text-red-700 border border-red-200"}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleImport} className="space-y-4">
                    <textarea 
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                        placeholder="Cole o JSON aqui..."
                        className="w-full h-96 font-mono text-sm border border-[#8c8f94] p-4 focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none rounded-sm"
                        required
                    />
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-[#2271b1] text-white px-6 py-2 text-[13px] font-semibold rounded-sm hover:bg-[#135e96] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Importando..." : "Iniciar Importação em Lote"}
                    </button>
                </form>
            </div>
        </div>
    )
}
