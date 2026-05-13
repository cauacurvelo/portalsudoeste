"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // In production, validate against a real database
    const validUsername = process.env.ADMIN_USERNAME || "editor"
    const validPassword = process.env.ADMIN_PASSWORD || "Portal@2026!"

    if (username === validUsername && password === validPassword) {
        const cookieStore = await cookies()
        cookieStore.set("admin-auth", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        })
        redirect("/admin")
    }

    return { error: "Credenciais inválidas. Verifique seu usuário e senha." }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("admin-auth")
    redirect("/admin/login")
}
