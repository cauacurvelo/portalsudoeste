"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ImageIcon, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { createPostAction } from "@/lib/actions/posts"

export default function NewArticlePage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState("")
    const [imageUploading, setImageUploading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement>(null)

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const MAX_SIZE = 4 * 1024 * 1024 // 4MB
        if (file.size > MAX_SIZE) {
            alert("A imagem selecionada é maior que 4MB. Por favor, utilize uma imagem menor ou comprima-a antes de enviar para evitar limitações do servidor.")
            return
        }

        setImageUploading(true)
        const fd = new FormData()
        fd.append("file", file)

        try {
            const res = await fetch("/api/upload", { method: "POST", body: fd })
            const json = await res.json()
            if (json.url) {
                setImageUrl(json.url)
            } else {
                alert("Erro no upload: " + (json.error || "desconhecido"))
            }
        } catch {
            alert("Erro ao conectar com o servidor de upload. A imagem pode ser grande demais para o servidor.")
        } finally {
            setImageUploading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        if (imageUrl) formData.set("image_url", imageUrl)

        const result = await createPostAction(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
        // On success, createPostAction redirects — no need to handle here
    }

    return (
        <div className="space-y-4 pb-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Adicionar novo post</h1>
            </div>

            {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-4 rounded-sm text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Main Content Area */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Adicionar título"
                                required
                                className="w-full text-[20px] p-2 border border-[#c3c4c7] rounded-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none placeholder:text-[#8c8f94]"
                            />
                        </div>

                        <div className="border border-[#c3c4c7] bg-white rounded-sm">
                            {/* Simple Toolbar Label */}
                            <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-3 py-2 text-[12px] text-[#646970]">
                                Conteúdo da notícia (HTML ou texto simples)
                            </div>
                            <textarea
                                name="content"
                                placeholder="Escreva o conteúdo completo da notícia aqui... Você pode usar tags HTML como <p>, <h2>, <strong>, <a href=''>, etc."
                                required
                                className="w-full h-[400px] p-4 border-none outline-none resize-y text-[14px] text-[#3c434a] focus:ring-0 font-mono"
                            />
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Resumo (Linha de Apoio)</h3>
                                <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                            </div>
                            <div className="p-3">
                                <textarea
                                    name="summary"
                                    rows={3}
                                    placeholder="Um breve resumo da notícia para exibição nos cards..."
                                    className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                                />
                                <p className="text-[12px] text-[#646970] mt-1">Resumos são exibidos nos cards de notícia na página inicial.</p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Tags (palavras-chave)</h3>
                                <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                            </div>
                            <div className="p-3">
                                <input
                                    type="text"
                                    name="tags"
                                    placeholder="política, poções, eleições (separadas por vírgula)"
                                    className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                                />
                                <p className="text-[12px] text-[#646970] mt-1">Separe as tags por vírgula. Importante para SEO.</p>
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
                                <div>
                                    <label className="block font-semibold mb-1">Status</label>
                                    <select 
                                        name="status"
                                        className="w-full border border-[#8c8f94] p-1 focus:border-[#2271b1] outline-none rounded-sm bg-white"
                                    >
                                        <option value="published">Publicado</option>
                                        <option value="draft">Rascunho</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 pt-1 border-t border-[#f0f0f1] mt-2 pt-2">
                                    <input type="checkbox" name="featured" id="featured" className="border-[#8c8f94] w-4 h-4" />
                                    <label htmlFor="featured" className="font-semibold cursor-pointer">Destaque na página inicial</label>
                                </div>
                            </div>
                            <div className="bg-[#f6f7f7] p-3 flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#2271b1] text-white px-4 py-1.5 rounded-sm hover:bg-[#135e96] border border-[#2271b1] text-[13px] font-semibold flex items-center gap-2 disabled:opacity-60"
                                >
                                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    {loading ? "Publicando..." : "Publicar"}
                                </button>
                            </div>
                        </div>

                        {/* Categoria */}
                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Categoria</h3>
                                <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                            </div>
                            <div className="p-3 text-[13px]">
                                <select
                                    name="category"
                                    className="w-full border border-[#8c8f94] p-1.5 focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                                >
                                    {SITE_CONFIG.categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Cidades */}
                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Cidade (Região)</h3>
                                <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                            </div>
                            <div className="p-3 text-[13px]">
                                <select
                                    name="city"
                                    className="w-full border border-[#8c8f94] p-1.5 focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                                >
                                    <option value="">Sem cidade específica</option>
                                    {SITE_CONFIG.cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Imagem Destacada */}
                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 flex justify-between items-center bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Imagem Destacada</h3>
                                <ChevronUp className="w-4 h-4 text-[#a7aaad]" />
                            </div>
                            <div className="p-3 text-[13px] space-y-3">
                                {imageUrl ? (
                                    <div className="relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imageUrl} alt="Preview" className="w-full aspect-video object-cover rounded border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => setImageUrl("")}
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-200 rounded p-4 text-center">
                                        <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-400 text-[11px] mb-2">Nenhuma imagem selecionada</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="cursor-pointer flex items-center justify-center gap-2 border border-[#2271b1] text-[#2271b1] px-3 py-1.5 rounded-sm hover:bg-blue-50 transition-colors text-[12px] font-semibold">
                                        {imageUploading ? (
                                            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Enviando...</>
                                        ) : (
                                            <><ImageIcon className="w-3.5 h-3.5" /> {imageUrl ? "Trocar imagem" : "Enviar imagem"}</>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={imageUploading}
                                        />
                                    </label>

                                    <div>
                                        <p className="text-[11px] text-gray-400 mb-1">Ou cole a URL da imagem:</p>
                                        <input
                                            type="url"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full border border-[#8c8f94] p-1.5 text-[12px] focus:border-[#2271b1] outline-none rounded-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
