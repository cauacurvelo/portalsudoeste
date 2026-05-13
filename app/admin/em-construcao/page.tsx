import { HardHat, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmConstrucaoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-20 h-20 bg-brand-blue-primary/10 rounded-full flex items-center justify-center mb-6">
                <HardHat className="w-10 h-10 text-brand-blue-primary" />
            </div>
            
            <h1 className="text-3xl font-serif font-black text-brand-blue-primary mb-4">
                Módulo em Desenvolvimento
            </h1>
            
            <p className="text-gray-500 max-w-md mb-8">
                Esta funcionalidade está no nosso planejamento, mas ainda não foi ativada nesta versão inicial do novo portal. Em breve você terá acesso a ela.
            </p>
            
            <Link 
                href="/admin" 
                className="flex items-center gap-2 bg-brand-blue-primary text-white px-6 py-2 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-brand-blue-secondary transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
            </Link>
        </div>
    )
}
