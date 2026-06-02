"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ImageIcon, X, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { supabase } from "@/lib/supabase"
import { use } from "react"

interface EditPageProps {
    params: Promise<{ id: string }>
}

export default function EditArticlePage({ params }: EditPageProps) {
    const { id } = use(params)
    const router = useRouter()
    const [article, setArticle] = React.useState<any>(null)
    const [loadingArticle, setLoadingArticle] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState("")
    const [imageUploading, setImageUploading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState(false)

    React.useEffect(() => {
        async function loadArticle() {
            const { data } = await supabase.from("posts").select("*").eq("id", parseInt(id)).single()
            if (data) {
                setArticle(data)
                setImageUrl(data.image_url || "")
            }
            setLoadingArticle(false)
        }
        loadArticle()
    }, [id])

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setImageUploading(true)
        const fd = new FormData()
        fd.append("file", file)
        try {
            const res = await fetch("/api/upload", { method: "POST", body: fd })
            const json = await res.json()
            if (json.url) setImageUrl(json.url)
            else alert("Erro no upload: " + (json.error || "desconhecido"))
        } catch {
            alert("Erro ao conectar com o servidor de upload.")
        } finally {
            setImageUploading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const title = (formData.get("title") as string)?.trim()
        const content = (formData.get("content") as string)?.trim()
        const summary = (formData.get("summary") as string)?.trim()
        const category = (formData.get("category") as string)?.trim()
        const city = (formData.get("city") as string)?.trim()
        const tagsRaw = (formData.get("tags") as string)?.trim()
        const featured = formData.get("featured") === "on"
        const status = formData.get("status") as string

        if (!title || !content) {
            setError("Título e conteúdo são obrigatórios.")
            setLoading(false)
            return
        }

        // Handle status prefixing
        let finalTitle = title
        if (status === "draft") {
            if (!title.startsWith("[RASCUNHO]")) {
                finalTitle = `[RASCUNHO] ${title}`
            }
        } else {
            // Remove prefix if switching to published
            if (title.startsWith("[RASCUNHO]")) {
                finalTitle = title.replace("[RASCUNHO]", "").trim()
            }
        }

        const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : []

        const { error: updateError } = await supabase
            .from("posts")
            .update({
                title: finalTitle,
                content,
                summary,
                category: category || "Notícias",
                city: city || null,
                image_url: imageUrl || null,
                tags,
                featured,
            })
            .eq("id", parseInt(id))

        if (updateError) {
            setError("Erro ao salvar: " + updateError.message)
            setLoading(false)
            return
        }

        setSuccess(true)
        setLoading(false)
        // Update local state so UI reflects prefix change if any
        setArticle((prev: any) => ({ ...prev, title: finalTitle }))
        setTimeout(() => setSuccess(false), 3000)
    }

    if (loadingArticle) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-[#2271b1]" />
                <span className="ml-2 text-[#646970]">Carregando notícia...</span>
            </div>
        )
    }

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <AlertCircle className="w-12 h-12 mb-3 text-gray-300" />
                <p>Notícia não encontrada.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4 pb-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Editar Post</h1>
                <a href={`/noticia/${article.slug}`} target="_blank" className="text-[#2271b1] text-[13px] hover:underline">
                    Ver no site →
                </a>
            </div>

            {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-4 rounded-sm text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 p-4 rounded-sm text-sm">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Notícia atualizada com sucesso!
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex-1 space-y-4">
                        <input
                            type="text"
                            name="title"
                            defaultValue={article.title}
                            placeholder="Título"
                            required
                            className="w-full text-[20px] p-2 border border-[#c3c4c7] rounded-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none"
                        />

                        <div className="border border-[#c3c4c7] bg-white rounded-sm">
                            <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-3 py-2 text-[12px] text-[#646970]">
                                Conteúdo da notícia (HTML)
                            </div>
                            <textarea
                                name="content"
                                defaultValue={article.content}
                                required
                                className="w-full h-[500px] p-4 border-none outline-none resize-y text-[14px] text-[#3c434a] focus:ring-0 font-mono"
                            />
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Resumo</h3>
                            </div>
                            <div className="p-3">
                                <textarea
                                    name="summary"
                                    defaultValue={article.summary}
                                    rows={3}
                                    className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] outline-none"
                                />
                            </div>
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Tags</h3>
                            </div>
                            <div className="p-3">
                                <input
                                    type="text"
                                    name="tags"
                                    defaultValue={Array.isArray(article.tags) ? article.tags.join(", ") : article.tags || ""}
                                    placeholder="política, poções (separadas por vírgula)"
                                    className="w-full border border-[#8c8f94] p-2 text-[13px] focus:border-[#2271b1] outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[280px] shrink-0 space-y-4">
                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Publicar</h3>
                            </div>
                            <div className="p-3 border-b border-[#c3c4c7] space-y-3">
                                <div>
                                    <label className="block text-[13px] font-semibold mb-1">Status</label>
                                    <select 
                                        name="status"
                                        defaultValue={article.title.startsWith("[RASCUNHO]") ? "draft" : "published"}
                                        className="w-full border border-[#8c8f94] p-1 text-[13px] outline-none rounded-sm bg-white"
                                    >
                                        <option value="published">Publicado</option>
                                        <option value="draft">Rascunho</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 text-[13px] pt-1 border-t border-[#f0f0f1] mt-2 pt-2">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        id="featured"
                                        defaultChecked={article.featured}
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="featured" className="font-semibold cursor-pointer">Destaque na página inicial</label>
                                </div>
                            </div>
                            <div className="bg-[#f6f7f7] p-3 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#2271b1] text-white px-4 py-1.5 rounded-sm hover:bg-[#135e96] text-[13px] font-semibold flex items-center gap-2 disabled:opacity-60"
                                >
                                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    {loading ? "Salvando..." : "Atualizar"}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Categoria</h3>
                            </div>
                            <div className="p-3">
                                <select
                                    name="category"
                                    defaultValue={article.category}
                                    className="w-full border border-[#8c8f94] p-1.5 focus:border-[#2271b1] outline-none"
                                >
                                    {SITE_CONFIG.categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Cidade</h3>
                            </div>
                            <div className="p-3">
                                <select
                                    name="city"
                                    defaultValue={article.city || ""}
                                    className="w-full border border-[#8c8f94] p-1.5 focus:border-[#2271b1] outline-none"
                                >
                                    <option value="">Sem cidade específica</option>
                                    {SITE_CONFIG.cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-white border border-[#c3c4c7] shadow-sm">
                            <div className="border-b border-[#c3c4c7] px-3 py-2 bg-[#f6f7f7]">
                                <h3 className="font-semibold text-[14px] text-[#1d2327]">Imagem Destacada</h3>
                            </div>
                            <div className="p-3 space-y-3 text-[13px]">
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
                                        <p className="text-gray-400 text-[11px]">Nenhuma imagem</p>
                                    </div>
                                )}
                                <label className="cursor-pointer flex items-center justify-center gap-2 border border-[#2271b1] text-[#2271b1] px-3 py-1.5 rounded-sm hover:bg-blue-50 text-[12px] font-semibold">
                                    {imageUploading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Enviando...</> : <><ImageIcon className="w-3.5 h-3.5" /> Trocar imagem</>}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={imageUploading} />
                                </label>
                                <div>
                                    <p className="text-[11px] text-gray-400 mb-1">Ou cole a URL:</p>
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
            </form>
        </div>
    )
}
