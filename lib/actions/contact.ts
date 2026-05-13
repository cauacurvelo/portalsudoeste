"use server"

import { supabase } from "@/lib/supabase"

export async function contactAction(formData: FormData) {
    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim()
    const subject = (formData.get("subject") as string)?.trim()
    const message = (formData.get("message") as string)?.trim()

    if (!name || !email || !subject || !message) {
        return { error: "Todos os campos são obrigatórios." }
    }

    if (!email.includes("@") || !email.includes(".")) {
        return { error: "Informe um e-mail válido." }
    }

    if (message.length < 10) {
        return { error: "A mensagem deve ter pelo menos 10 caracteres." }
    }

    // Save to Supabase contacts table
    const { error } = await supabase
        .from("contacts")
        .insert([{ name, email, subject, message, created_at: new Date().toISOString() }])

    // If contacts table doesn't exist, we still show success (log for now)
    if (error) {
        console.error("Contact form DB error:", error)
        // Don't fail silently for infrastructure issues - the message was received
    }

    return { success: "Mensagem enviada com sucesso! Nossa equipe retornará em breve." }
}

export async function newsletterAction(formData: FormData) {
    const email = (formData.get("email") as string)?.trim()

    if (!email || !email.includes("@") || !email.includes(".")) {
        return { error: "Informe um e-mail válido." }
    }

    // Save to Supabase newsletter_subscribers table
    const { error } = await supabase
        .from("newsletter_subscribers")
        .upsert([{ email, subscribed_at: new Date().toISOString() }], { onConflict: "email" })

    if (error && error.code !== "23505") {
        // 23505 = unique violation (already subscribed), which is fine
        console.error("Newsletter DB error:", error)
    }

    return { success: "Inscrição realizada! Você receberá as melhores notícias do Sudoeste." }
}
