"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Ad, getAllAds, createAd, deleteAd, toggleAdStatus } from "@/lib/data/ads-db"
import { Plus, Trash2, Power, PowerOff, Image as ImageIcon } from "lucide-react"

export default function AdminPropagandasPage() {
    const [ads, setAds] = useState<Ad[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    // Form states
    const [title, setTitle] = useState("")
    const [linkUrl, setLinkUrl] = useState("")
    const [position, setPosition] = useState("topo")
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        loadAds()
    }, [])

    async function loadAds() {
        setLoading(true)
        const data = await getAllAds()
        setAds(data)
        setLoading(false)
    }

    async function handleAddAd(e: React.FormEvent) {
        e.preventDefault()
        if (!file || !title) return

        setUploading(true)
        setErrorMsg("")
        try {
            // Upload da imagem
            const fileExt = file.name.split('.').pop()
            const fileName = `ad_${Date.now()}.${fileExt}`
            
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(fileName, file)

            if (uploadError) throw uploadError

            const { data: publicUrlData } = supabase.storage
                .from('media')
                .getPublicUrl(fileName)

            // Criar no banco
            await createAd({
                title,
                link_url: linkUrl,
                image_url: publicUrlData.publicUrl,
                position,
                active: true
            })

            // Reset form
            setTitle("")
            setLinkUrl("")
            setFile(null)
            loadAds()
        } catch (error: any) {
            console.error("Erro ao criar ad:", error)
            setErrorMsg(error.message || "Erro desconhecido ao tentar criar a propaganda.")
        } finally {
            setUploading(false)
        }
    }

    async function handleToggle(id: string, current: boolean) {
        await toggleAdStatus(id, current)
        loadAds()
    }

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja deletar esta propaganda?")) return
        await deleteAd(id)
        loadAds()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Gerenciar Propagandas</h1>
            </div>

            {errorMsg && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                    <p className="font-bold">Aviso: A tabela de propagandas pode não existir no banco de dados.</p>
                    <p className="text-sm">Por favor, execute o código SQL no seu painel do Supabase (SQL Editor) para criar a tabela "ads". Consulte o desenvolvedor se precisar do código.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Form to add */}
                <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm p-4">
                    <h2 className="text-lg font-bold mb-4">Nova Propaganda</h2>
                    <form onSubmit={handleAddAd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título (Uso interno)</label>
                            <input 
                                type="text" 
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] outline-none rounded-sm"
                                placeholder="Ex: Dia das Mães - Santa Casa"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link de destino (Opcional)</label>
                            <input 
                                type="url" 
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] outline-none rounded-sm"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Posição no site</label>
                            <select 
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] outline-none rounded-sm"
                            >
                                <option value="topo">Topo (Abaixo de Em Alta) - 1100x150px ou 728x90px</option>
                                <option value="sidebar">Barra Lateral (Sidebar) - 300x250px</option>
                                <option value="meio">Meio das Matérias</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Banner</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                required
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="w-full border border-[#8c8f94] p-2 text-[13px] outline-none rounded-sm bg-gray-50"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={uploading}
                            className="w-full bg-[#2271b1] text-white px-4 py-2 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors disabled:opacity-50"
                        >
                            {uploading ? 'Salvando...' : 'Adicionar Propaganda'}
                        </button>
                    </form>
                </div>

                {/* List of ads */}
                <div className="md:col-span-2">
                    <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm overflow-hidden">
                        <table className="w-full text-left text-[13px] text-[#3c434a]">
                            <thead>
                                <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                                    <th className="py-3 px-4 font-bold text-[#1d2327]">Banner</th>
                                    <th className="py-3 px-4 font-bold text-[#1d2327]">Detalhes</th>
                                    <th className="py-3 px-4 font-bold text-[#1d2327]">Posição</th>
                                    <th className="py-3 px-4 font-bold text-[#1d2327]">Status</th>
                                    <th className="py-3 px-4 font-bold text-[#1d2327] text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0f0f1]">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500">Carregando...</td>
                                    </tr>
                                ) : ads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500">Nenhuma propaganda cadastrada.</td>
                                    </tr>
                                ) : (
                                    ads.map((ad) => (
                                        <tr key={ad.id} className="hover:bg-[#f6f7f7]">
                                            <td className="py-3 px-4">
                                                <div className="w-24 h-12 relative bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center rounded">
                                                    {ad.image_url ? (
                                                        <img src={ad.image_url} alt={ad.title} className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        <ImageIcon className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-bold text-[#2271b1]">{ad.title}</div>
                                                <div className="text-[11px] text-gray-500 truncate max-w-[150px]">{ad.link_url || 'Sem link'}</div>
                                            </td>
                                            <td className="py-3 px-4 uppercase text-[10px] font-bold tracking-wider">
                                                {ad.position}
                                            </td>
                                            <td className="py-3 px-4">
                                                {ad.active ? (
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px] font-bold">Ativo</span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-[10px] font-bold">Pausado</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-right space-x-2">
                                                <button 
                                                    onClick={() => handleToggle(ad.id, ad.active)}
                                                    className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    title={ad.active ? "Pausar" : "Ativar"}
                                                >
                                                    {ad.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(ad.id)}
                                                    className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
