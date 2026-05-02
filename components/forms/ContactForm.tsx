"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactAction } from "@/lib/actions/contact"
import { CheckCircle, AlertCircle, Send } from "lucide-react"

export function ContactForm() {
    const [status, setStatus] = React.useState<{ type: "success" | "error"; message: string } | null>(null)
    const [loading, setLoading] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setStatus(null)

        const formData = new FormData(e.currentTarget)
        const result = await contactAction(formData)

        if (result.success) {
            setStatus({ type: "success", message: result.success })
            formRef.current?.reset()
        } else if (result.error) {
            setStatus({ type: "error", message: result.error })
        }
        setLoading(false)
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-10 rounded-sm shadow-sm border border-gray-100 space-y-6">
            {status && (
                <div className={`flex items-center gap-2 text-sm p-4 rounded-sm border ${status.type === "success"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : "bg-red-50 text-red-600 border-red-100"
                    }`}>
                    {status.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    {status.message}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Seu Nome</Label>
                    <Input id="name" name="name" placeholder="Nome completo" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Seu E-mail</Label>
                    <Input id="email" name="email" type="email" placeholder="email@exemplo.com" required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" name="subject" placeholder="Do que se trata o contato?" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" name="message" placeholder="Escreva sua mensagem aqui..." className="min-h-[150px]" required />
            </div>
            <Button
                type="submit"
                disabled={loading}
                className="bg-brand-red hover:bg-red-700 font-bold uppercase tracking-widest text-xs px-10 h-12"
            >
                {loading ? "Enviando..." : <><Send className="w-4 h-4 mr-2" /> Enviar Mensagem</>}
            </Button>
        </form>
    )
}
