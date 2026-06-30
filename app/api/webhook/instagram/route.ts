import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
    try {
        // Verify webhook secret (Bearer token)
        const authHeader = req.headers.get("authorization")
        const secret = process.env.WEBHOOK_SECRET

        if (!secret || authHeader !== `Bearer ${secret}`) {
            console.error("Unauthorized Instagram webhook attempt.")
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        
        // Expected fields from a service like Make.com/Zapier
        const { title, caption, media_url, permalink, timestamp } = body

        if (!caption) {
            return NextResponse.json({ success: false, error: "No caption provided" }, { status: 400 })
        }

        // 1. Check if it contains the hashtag #noticia or #notícia (case-insensitive)
        const hashtagRegex = /#not[ií]cia\b/i
        if (!hashtagRegex.test(caption)) {
            return NextResponse.json({ success: true, message: "Post ignored: does not contain #noticia" })
        }

        // 2. Clean the caption by removing the hashtag
        const cleanedCaption = caption.replace(hashtagRegex, "").trim()

        const supabase = createAdminClient()

        // 3. Download image from Instagram and upload to our own bucket to avoid expiry
        let finalImageUrl = media_url
        if (media_url && media_url.startsWith('http')) {
            try {
                const imgRes = await fetch(media_url)
                const imgBlob = await imgRes.blob()
                const imgExt = media_url.split('?')[0].split('.').pop() || 'jpg'
                const imgPath = `instagram/sync_${Date.now()}.${imgExt}`
                
                const { error: uploadError } = await supabase.storage
                    .from('media')
                    .upload(imgPath, imgBlob, { contentType: imgBlob.type })
                
                if (!uploadError) {
                    finalImageUrl = supabase.storage.from('media').getPublicUrl(imgPath).data.publicUrl
                }
            } catch (err) {
                console.error("Failed to sync Instagram image, using direct URL:", err)
            }
        }

        // 4. Generate title and slug from the cleaned caption
        const firstLine = cleanedCaption.split('\n')[0].trim()
        const postTitle = title || (firstLine.length > 100 ? firstLine.substring(0, 100) + "..." : firstLine) || "Post do Instagram"
        const postSlug = `${slugify(postTitle)}-${Date.now()}`

        // 5. Query highest current ID to manually increment (required by posts table schema)
        let nextId = 1
        const { data: maxIdData } = await supabase.from('posts').select('id').order('id', { ascending: false }).limit(1)
        if (maxIdData && maxIdData.length > 0) {
            nextId = maxIdData[0].id + 1
        }

        // 6. Create post in database
        const { data, error } = await supabase
            .from('posts')
            .insert([{
                id: nextId,
                title: postTitle,
                slug: postSlug,
                content: cleanedCaption.replace(/\n/g, '<br>'),
                summary: cleanedCaption.substring(0, 160) + (cleanedCaption.length > 160 ? "..." : ""),
                image_url: finalImageUrl,
                category: "Instagram",
                author: "Instagram Sync",
                date: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
                views: 0,
                featured: false
            }])
            .select()

        if (error) throw error

        // 7. Revalidate frontend
        revalidatePath('/')
        revalidatePath('/noticias')
        revalidatePath('/categoria/instagram')

        return NextResponse.json({ 
            success: true, 
            id: data[0].id,
            slug: postSlug 
        })

    } catch (err: any) {
        console.error("Webhook error:", err)
        return NextResponse.json({ 
            success: false, 
            error: err.message || "Internal server error" 
        }, { status: 500 })
    }
}
