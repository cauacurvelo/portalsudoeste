"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center space-y-8 max-w-lg">
                <div className="space-y-2">
                    <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">⚠️</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-serif font-black text-brand-blue-primary">
                        Algo deu errado
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Ocorreu um erro inesperado. Nossa equipe técnica já foi notificada.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-brand-blue-primary hover:bg-brand-blue-secondary font-bold uppercase tracking-widest text-xs h-12 px-8"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" /> Tentar Novamente
                    </Button>
                    <Link href="/">
                        <Button variant="outline" className="font-bold uppercase tracking-widest text-xs h-12 px-8 border-gray-200">
                            <Home className="w-4 h-4 mr-2" /> Página Inicial
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
