"use client"

import { useState, useRef } from "react"
import { quickDraftAction } from "@/lib/actions/drafts"
import { Loader2 } from "lucide-react"

export function QuickDraftForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const result = await quickDraftAction(formData)

        if (result?.success) {
            setMessage({ type: "success", text: result.success })
            formRef.current?.reset()
        } else if (result?.error) {
            setMessage({ type: "error", text: result.error })
        }
        setLoading(false)

        if (result?.success) {
            setTimeout(() => setMessage(null), 3000)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            {message && (
                <div className={`text-[12px] p-2 rounded-sm border ${
                    message.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
                }`}>
                    {message.text}
                </div>
            )}
            <input
                type="text"
                name="title"
                required
                placeholder="Título do post"
                className="w-full border border-[#8c8f94] px-3 py-2 text-[13px] focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20 outline-none rounded-sm bg-[#fafafa]"
            />
            <textarea
                name="content"
                placeholder="No que você está pensando?"
                rows={4}
                className="w-full border border-[#8c8f94] px-3 py-2 text-[13px] focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20 outline-none resize-none rounded-sm bg-[#fafafa]"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2271b1] text-white px-4 py-1.5 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {loading ? "Salvando..." : "Salvar rascunho"}
                </button>
            </div>
        </form>
    )
}
