
import { createClient } from '@supabase/supabase-js'
import * as https from 'https'
import * as http from 'http'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const STORAGE_BUCKET = 'media'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
})

async function fetchBinary(url: string): Promise<Buffer | null> {
    return new Promise(resolve => {
        try {
            const proto = url.startsWith('https') ? https : http
            const req = proto.get(url, {
                headers: { 'User-Agent': 'PortalSudoeste-Migrator/1.0' },
                timeout: 5000,
            }, res => {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    const redirectUrl = res.headers.location
                    if (redirectUrl) return resolve(fetchBinary(redirectUrl))
                }
                if (!res.statusCode || res.statusCode >= 400) return resolve(null)
                const chunks: Buffer[] = []
                res.on('data', chunk => chunks.push(chunk))
                res.on('end', () => resolve(Buffer.concat(chunks)))
                res.on('error', () => resolve(null))
            })
            req.on('error', () => resolve(null))
            req.on('timeout', () => { req.destroy(); resolve(null) })
        } catch {
            resolve(null)
        }
    })
}

function getMimeType(url: string): string {
    const ext = path.extname(url.split('?')[0]).toLowerCase()
    const mimeMap: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
    }
    return mimeMap[ext] || 'image/jpeg'
}

async function uploadImage(url: string): Promise<string | null> {
    try {
        const fileName = path.basename(url.split('?')[0])
        const folder = 'content-images'
        const storagePath = `${folder}/${fileName}`

        const { data: existing } = await supabase.storage.from(STORAGE_BUCKET).list(folder, { search: fileName })
        if (existing && existing.length > 0) {
            return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath).data.publicUrl
        }

        const buffer = await fetchBinary(url)
        if (!buffer || buffer.length === 0) return null

        const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, buffer, {
            contentType: getMimeType(url),
            upsert: true
        })

        if (error) return null
        return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath).data.publicUrl
    } catch {
        return null
    }
}

async function migrate() {
    console.log("🚀 Starting Content Image Migration & Cleanup...")
    
    let offset = 0
    const limit = 50
    let totalUpdated = 0
    let totalRemoved = 0

    while (true) {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('id, content')
            .ilike('content', '%portaldosudoeste.com.br%')
            .range(offset, offset + limit - 1)

        if (error) {
            console.error("❌ Error fetching posts:", error)
            break
        }
        if (!posts || posts.length === 0) break

        for (const post of posts) {
            // Match <img> tags and also tags wrapped in <p> if they only contain the image
            const imgRegex = /<p[^>]*>\s*<img[^>]+src="([^">]+)"[^>]*>\s*<\/p>|<img[^>]+src="([^">]+)"[^>]*>/g
            let match
            let newContent = post.content
            let updated = false

            // We need to re-scan because we are modifying the content
            let currentMatches = [...post.content.matchAll(imgRegex)]
            
            for (const m of currentMatches) {
                const fullTag = m[0]
                const oldUrl = m[1] || m[2]

                if (oldUrl.includes('portaldosudoeste.com.br')) {
                    const newUrl = await uploadImage(oldUrl)
                    if (newUrl) {
                        console.log(`✅ Fixed image in post ${post.id}: ${path.basename(oldUrl)}`)
                        newContent = newContent.replace(oldUrl, newUrl)
                        updated = true
                    } else {
                        // Image is broken (404)
                        console.log(`🗑️ Removing broken image in post ${post.id}: ${path.basename(oldUrl)}`)
                        newContent = newContent.replace(fullTag, '')
                        totalRemoved++
                        updated = true
                    }
                }
            }

            if (updated) {
                const { error: updateError } = await supabase
                    .from('posts')
                    .update({ content: newContent })
                    .eq('id', post.id)
                
                if (updateError) {
                    console.error(`❌ Failed to update post ${post.id}:`, updateError.message)
                } else {
                    totalUpdated++
                }
            }
        }

        offset += limit
        console.log(`📊 Processed ${offset} posts... Updated: ${totalUpdated}, Removed Broken: ${totalRemoved}`)
        
        // Stop after some batches for this turn to avoid timeout, or continue if time allows
        if (offset >= 1000) break 
    }

    console.log(`\n🎉 Content cleanup complete!`)
    console.log(`   Posts updated: ${totalUpdated}`)
    console.log(`   Broken images removed: ${totalRemoved}`)
}

migrate()
