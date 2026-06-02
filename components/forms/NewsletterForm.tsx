"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { newsletterAction } from "@/lib/actions/contact"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "sidebar" }) {
    const [status, setStatus] = React.useState<{ type: "success" | "error"; message: string } | null>(null)
    const [loading, setLoading] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setStatus(null)

        const formData = new FormData(e.currentTarget)
        const result = await newsletterAction(formData)

        if (result.success) {
            setStatus({ type: "success", message: result.success })
            formRef.current?.reset()
        } else if (result.error) {
            setStatus({ type: "error", message: result.error })
        }
        setLoading(false)
    }

    if (status?.type === "success") {
        return (
            <div className={`flex items-center gap-2 text-sm font-medium ${variant === 'sidebar' ? 'text-green-400' : 'text-green-600'}`}>
                <CheckCircle className="w-4 h-4" />
                {status.message}
            </div>
        )
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input 
                type="email" 
                name="email" 
                placeholder="Seu melhor e-mail" 
                className={variant === 'sidebar' ? "bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:bg-white/20" : "bg-white"} 
                required 
            />
            {status?.type === "error" && (
                <p className="text-red-500 text-xs">{status.message}</p>
            )}
            <Button
                type="submit"
                disabled={loading}
                className={`w-full font-bold uppercase text-xs h-10 tracking-widest ${
                    variant === 'sidebar' 
                        ? 'bg-brand-red hover:bg-red-700 text-white' 
                        : 'bg-brand-blue-primary'
                }`}
            >
                <Mail className="w-4 h-4 mr-2" /> {loading ? "Inscrevendo..." : "Inscrever-se"}
            </Button>
        </form>
    )
}
