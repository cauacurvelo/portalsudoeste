"use server"

export async function contactAction(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
        return { error: "Todos os campos são obrigatórios." }
    }

    // In production: send email, save to DB, etc.
    // For now, simulate processing
    await new Promise(resolve => setTimeout(resolve, 500))

    console.log("📧 Contact form submission:", { name, email, subject, message })

    return { success: "Mensagem enviada com sucesso! Retornaremos em breve." }
}

export async function newsletterAction(formData: FormData) {
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
        return { error: "Informe um e-mail válido." }
    }

    // In production: save to newsletter service (Mailchimp, etc.)
    await new Promise(resolve => setTimeout(resolve, 300))

    console.log("📬 Newsletter subscription:", email)

    return { success: "Inscrição realizada! Você receberá nossas novidades." }
}
