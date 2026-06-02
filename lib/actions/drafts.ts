"use server"

import { createAdminClient } from "@/lib/supabase"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function quickDraftAction(formData: FormData) {
    const admin = createAdminClient()
    const title = (formData.get("title") as string)?.trim()
    const content = (formData.get("content") as string)?.trim()

    if (!title) {
        return { error: "O título é obrigatório para o rascunho." }
    }

    // Gerar slug único
    const baseSlug = slugify(title)
    const timestamp = Date.now()
    const slug = `${baseSlug}-${timestamp}`

    // Fetch next ID
    let nextId = 1
    const { data: maxIdData } = await admin.from('posts').select('id').order('id', { ascending: false }).limit(1)
    if (maxIdData && maxIdData.length > 0) {
        nextId = maxIdData[0].id + 1
    }

    const { error } = await admin
        .from("posts")
        .insert([{
            id: nextId,
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
        return { error: "Erro ao salvar rascunho: " + error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/admin/noticias")

    return { success: "Rascunho salvo com sucesso!" }
}
