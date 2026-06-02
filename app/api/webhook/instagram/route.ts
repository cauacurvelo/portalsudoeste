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

        if (!caption && !title) {
            return NextResponse.json({ success: false, error: "No content provided" }, { status: 400 })
        }

        const supabase = createAdminClient()

        // 1. Download image from Instagram and upload to our own bucket to avoid expiry
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

        // 2. Generate title from caption if not provided
        const postTitle = title || caption.split('\n')[0].substring(0, 100) || "Post do Instagram"
        const postSlug = `${slugify(postTitle)}-${Date.now()}`

        // 3. Create post in database
        const { data, error } = await supabase
            .from('posts')
            .insert([{
                title: postTitle,
                slug: postSlug,
                content: caption.replace(/\n/g, '<br>'),
                summary: caption.substring(0, 160) + "...",
                image_url: finalImageUrl,
                category: "Instagram",
                author: "Instagram Sync",
                date: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
                views: 0,
                featured: false
            }])
            .select()

        if (error) throw error

        // 4. Revalidate frontend
        revalidatePath('/')
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
