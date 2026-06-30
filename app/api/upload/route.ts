import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
    // PROTECT ROUTE: Only logged-in admins can upload via this API
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-auth")
    if (!session || session.value !== "authenticated") {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const file = formData.get("file") as File | null

        if (!file || file.size === 0) {
            return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 })
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"]
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Tipo de arquivo não permitido. Use JPG, PNG, WebP ou GIF." }, { status: 400 })
        }

        const MAX_SIZE = 10 * 1024 * 1024 // 10MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "Arquivo muito grande. Máximo 10MB." }, { status: 400 })
        }

        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
        const fileName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

        const supabase = createAdminClient()
        const { data, error } = await supabase.storage
            .from("media")
            .upload(fileName, file, {
                contentType: file.type,
                upsert: false,
            })

        if (error) {
            console.error("Supabase upload error:", error)
            return NextResponse.json({ error: "Erro no upload: " + error.message }, { status: 500 })
        }

        const { data: urlData } = supabase.storage.from("media").getPublicUrl(data.path)

        return NextResponse.json({ url: urlData.publicUrl })
    } catch (err) {
        console.error("Upload route error:", err)
        return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
    }
}
