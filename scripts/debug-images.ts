
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function debug() {
    console.log("Checking Storage bucket 'media'...")
    const { data, error } = await supabase.storage.from('media').list('', { limit: 20 })
    if (error) {
        console.error("Error listing media:", error)
        return
    }
    console.log("Files found in root:", data?.map(f => f.name))

    console.log("\nChecking for images in content of recent posts...")
    const { data: posts, error: postError } = await supabase
        .from('posts')
        .select('id, title, content')
        .order('date', { ascending: false })
        .limit(3)

    if (postError) {
        console.error("Error fetching posts:", postError)
        return
    }

    posts?.forEach(post => {
        const imgTags = post.content?.match(/<img[^>]+src="([^">]+)"/g)
        console.log(`\nPost ID: ${post.id} - ${post.title}`)
        if (imgTags) {
            imgTags.forEach((tag: string) => {
                const src = tag.match(/src="([^">]+)"/)?.[1]
                console.log(`- Found image src: ${src}`)
            })
        } else {
            console.log("- No images found in content.")
        }
    })
}

debug()
