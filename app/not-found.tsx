import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center space-y-8 max-w-lg">
                <div className="space-y-2">
                    <h1 className="text-8xl font-black text-brand-blue-primary font-serif">404</h1>
                    <div className="w-20 h-1 bg-brand-red mx-auto" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-serif font-black text-brand-blue-primary">
                        Página não encontrada
                    </h2>
                    <p className="text-gray-500 font-medium">
                        A página que você está procurando pode ter sido removida, 
                        renomeada ou está temporariamente indisponível.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button className="bg-brand-blue-primary hover:bg-brand-blue-secondary font-bold uppercase tracking-widest text-xs h-12 px-8">
                            <Home className="w-4 h-4 mr-2" /> Página Inicial
                        </Button>
                    </Link>
                    <Link href="/busca">
                        <Button variant="outline" className="font-bold uppercase tracking-widest text-xs h-12 px-8 border-gray-200">
                            <Search className="w-4 h-4 mr-2" /> Buscar Notícias
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
