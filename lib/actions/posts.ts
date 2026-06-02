"use server"

import { supabase, createAdminClient } from "@/lib/supabase"
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

    // Query highest current ID to manually increment
    let nextId = 1
    const { data: maxIdData } = await supabase.from('posts').select('id').order('id', { ascending: false }).limit(1)
    if (maxIdData && maxIdData.length > 0) {
        nextId = maxIdData[0].id + 1
    }

    const { data, error } = await supabase
        .from("posts")
        .insert([{
            id: nextId,
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

export async function bulkImportAction(jsonString: string) {
    try {
        const items = JSON.parse(jsonString)
        if (!Array.isArray(items)) {
            return { error: "O JSON deve ser um array." }
        }

        const admin = createAdminClient()

        // Fetch max ID once to start incrementing
        let currentId = 1
        const { data: maxIdData } = await admin.from('posts').select('id').order('id', { ascending: false }).limit(1)
        if (maxIdData && maxIdData.length > 0) {
            currentId = maxIdData[0].id
        }

        let added = 0
        const errors: string[] = []
        for (const item of items) {
            currentId++
            const baseSlug = slugify(item.title)
            const timestamp = Date.now() + added
            const slug = `${baseSlug}-${timestamp}`

            const { error } = await admin.from('posts').insert([{
                id: currentId,
                title: item.title,
                slug,
                content: item.content,
                summary: item.summary,
                category: item.category || "Notícias",
                city: item.city || null,
                image_url: item.image_url || null,
                tags: item.tags || [],
                featured: !!item.featured,
                author: "Redação Portal",
                date: new Date().toISOString(),
                views: 0,
            }])

            if (error) {
                console.error("Error bulk inserting item:", error.message, item.title)
                errors.push(`"${item.title}": ${error.message}`)
                continue
            }
            added++
        }

        revalidatePath("/")
        revalidatePath("/noticias")
        revalidatePath("/admin/noticias")

        if (errors.length > 0 && added === 0) {
            return { error: "Nenhuma notícia foi inserida. Erros: " + errors.join(" | ") }
        }

        return { success: true, added, errors }

    } catch (err: any) {
        return { error: "Erro ao processar JSON: " + err.message }
    }
}

