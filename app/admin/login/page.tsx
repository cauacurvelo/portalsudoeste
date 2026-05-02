"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, Lock, ArrowRight, AlertCircle } from "lucide-react"
import { loginAction } from "@/lib/actions/auth"

export default function LoginPage() {
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)

        try {
            const result = await loginAction(formData)
            if (result?.error) {
                setError(result.error)
                setLoading(false)
            }
            // If successful, loginAction redirects via server-side redirect
        } catch {
            // redirect() throws an error in Next.js — this means success
            router.push("/admin")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-gray-light px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-brand-blue-primary uppercase tracking-widest">PORTAL SUDOESTE</h1>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Painel de Publicação</p>
                </div>

                <Card className="border-none shadow-2xl rounded-sm">
                    <CardHeader className="space-y-1 pt-8">
                        <CardTitle className="text-2xl font-serif font-black text-center">Acesse sua conta</CardTitle>
                        <CardDescription className="text-center">Entre com suas credenciais para gerenciar o portal</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 px-8 pb-8">
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-sm border border-red-100">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="admin@portaldosudoeste.com.br"
                                        required
                                        className="pl-10 h-12"
                                    />
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Senha</Label>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="pl-10 h-12"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="px-8 pb-8">
                            <Button
                                type="submit"
                                className="w-full bg-brand-blue-primary hover:bg-brand-blue-secondary h-12 font-bold uppercase tracking-widest"
                                disabled={loading}
                            >
                                {loading ? "Autenticando..." : (
                                    <>Entrar <ArrowRight className="ml-2 w-4 h-4" /></>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-xs text-gray-400 font-medium">
                    Exclusivo para administradores e equipe de redação.
                </p>
            </div>
        </div>
    )
}
