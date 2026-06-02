"use server"

import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function quickDraftAction(formData: FormData) {
    const title = (formData.get("title") as string)?.trim()
    const content = (formData.get("content") as string)?.trim()

    if (!title) {
        return { error: "O título é obrigatório para o rascunho." }
    }

    // Gerar slug único
    const baseSlug = slugify(title)
    const timestamp = Date.now()
    const slug = `${baseSlug}-${timestamp}`

    const { error } = await supabase
        .from("posts")
        .insert([{
            title: `[RASCUNHO] ${title}`,
            slug,
            content: content || "Rascunho rápido sem conteúdo ainda.",
            summary: "",
            category: "Notícias",
            author: "Redação Portal",
            date: new Date().toISOString(),
            views: 0,
            featured: false
        }])

    if (error) {
        console.error("Error creating quick draft:", error)
        return { error: "Erro ao salvar rascunho." }
    }

    revalidatePath("/admin")
    revalidatePath("/admin/noticias")

    return { success: "Rascunho salvo com sucesso!" }
}
