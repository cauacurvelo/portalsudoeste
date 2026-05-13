"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ImageIcon, Trash2, Upload, ExternalLink } from "lucide-react"

export default function MidiaPage() {
    const [files, setFiles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        loadFiles()
    }, [])

    async function loadFiles() {
        setLoading(true)
        const { data, error } = await supabase.storage.from('media').list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        })
        
        if (data) {
            // Filter out placeholder or empty folders
            const validFiles = data.filter(f => f.name !== '.emptyFolderPlaceholder')
            setFiles(validFiles)
        }
        setLoading(false)
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return
        const file = e.target.files[0]
        
        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `upload_${Date.now()}.${fileExt}`

        const { error } = await supabase.storage
            .from('media')
            .upload(fileName, file)

        if (!error) {
            loadFiles()
        } else {
            alert("Erro ao fazer upload: " + error.message)
        }
        setUploading(false)
    }

    async function handleDelete(name: string) {
        if (!confirm("Tem certeza que deseja excluir esta imagem? Se ela estiver sendo usada em alguma notícia, a imagem vai quebrar no site.")) return
        
        await supabase.storage.from('media').remove([name])
        loadFiles()
    }

    function getPublicUrl(name: string) {
        return supabase.storage.from('media').getPublicUrl(name).data.publicUrl
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Biblioteca de Mídia</h1>
                
                <div>
                    <label className="cursor-pointer flex items-center gap-2 bg-[#2271b1] text-white px-4 py-2 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors">
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Enviando...' : 'Adicionar Nova'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                    </label>
                </div>
            </div>

            <div className="bg-white border border-[#c3c4c7] shadow-sm p-4 min-h-[60vh]">
                {loading ? (
                    <div className="flex items-center justify-center h-40 text-gray-500">Carregando mídia...</div>
                ) : files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200">
                        <ImageIcon className="w-12 h-12 mb-4 text-gray-300" />
                        <p>Nenhum arquivo de mídia encontrado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {files.map((file) => {
                            const url = getPublicUrl(file.name)
                            return (
                                <div key={file.id} className="group relative aspect-square bg-gray-100 border border-gray-200 rounded overflow-hidden">
                                    <img 
                                        src={url} 
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                        <div className="flex justify-end gap-1">
                                            <a 
                                                href={url} 
                                                target="_blank" 
                                                className="p-1.5 bg-white text-gray-700 rounded hover:bg-gray-100"
                                                title="Ver original"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button 
                                                onClick={() => handleDelete(file.name)}
                                                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                                                title="Excluir"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-white text-[10px] truncate bg-black/50 px-1 py-0.5 rounded" title={file.name}>
                                            {file.name}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
