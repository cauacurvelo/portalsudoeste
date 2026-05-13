"use client"

import { useState } from "react"
import { deletePostAction } from "@/lib/actions/posts"
import { Trash2, Loader2 } from "lucide-react"

export function DeletePostButton({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        if (!confirm(`Tem certeza que deseja excluir a notícia "${articleTitle}"? Esta ação não pode ser desfeita.`)) return
        setLoading(true)
        const result = await deletePostAction(articleId)
        if (result?.error) {
            alert(result.error)
            setLoading(false)
        }
        // On success, page revalidates automatically
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-[#d63638] hover:underline flex items-center gap-1 disabled:opacity-50"
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            Lixeira
        </button>
    )
}
