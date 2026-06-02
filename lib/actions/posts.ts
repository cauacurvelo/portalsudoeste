"use server"

import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface CreatePostData {
    title: string
    content: string
    summary: string
    category: string
    city: string
    imageUrl: string
    tags: string
    featured: boolean
}

export async function createPostAction(formData: FormData) {
    const title = (formData.get("title") as string)?.trim()
    const content = (formData.get("content") as string)?.trim()
    const summary = (formData.get("summary") as string)?.trim()
    const category = (formData.get("category") as string)?.trim()
    const city = (formData.get("city") as string)?.trim()
    const imageUrl = (formData.get("image_url") as string)?.trim()
    const tagsRaw = (formData.get("tags") as string)?.trim()
    const featured = formData.get("featured") === "on"
    const status = formData.get("status") as string

    if (!title || !content) {
        return { error: "Título e conteúdo são obrigatórios." }
    }

    // Handle Draft Status
    let finalTitle = title
    if (status === "draft" && !title.startsWith("[RASCUNHO]")) {
        finalTitle = `[RASCUNHO] ${title}`
    }

    // Generate unique slug
    const baseSlug = slugify(finalTitle)
    const timestamp = Date.now()
    const slug = `${baseSlug}-${timestamp}`

    const tags = tagsRaw
        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : []

    const { data, error } = await supabase
        .from("posts")
        .insert([{
            title: finalTitle,
            slug,
            content,
            summary,
            category: category || "Notícias",
            city: city || null,
            image_url: imageUrl || null,
            tags,
            featured,
            author: "Redação Portal",
            date: new Date().toISOString(),
            views: 0,
        }])
        .select("slug")
        .single()

    if (error) {
        console.error("Error creating post:", error)
        return { error: "Erro ao publicar a notícia. Tente novamente." }
    }

    revalidatePath("/")
    revalidatePath("/noticias")
    revalidatePath("/admin/noticias")

    redirect(`/admin/noticias?created=${data.slug}`)
}

export async function deletePostAction(id: string) {
    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", parseInt(id))

    if (error) {
        return { error: "Erro ao excluir a notícia." }
    }

    revalidatePath("/")
    revalidatePath("/noticias")
    revalidatePath("/admin/noticias")

    return { success: true }
}

export async function uploadImageAction(formData: FormData) {
    const file = formData.get("file") as File
    if (!file || file.size === 0) {
        return { error: "Nenhum arquivo selecionado." }
    }

    const ext = file.name.split(".").pop()
    const fileName = `uploads/${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
        .from("media")
        .upload(fileName, file, { upsert: false })

    if (error) {
        return { error: "Erro no upload: " + error.message }
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(data.path)
    return { url: urlData.publicUrl }
}
