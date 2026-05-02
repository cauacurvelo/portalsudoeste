"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, ChevronDown, Home, Search, Facebook, Instagram, X } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { slugify } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function MainNav() {
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [searchOpen, setSearchOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const router = useRouter()
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery("")
            setSearchOpen(false)
            setMobileOpen(false)
        }
    }

    React.useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSearchOpen(false)
        }
        if (searchOpen) document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [searchOpen])

    return (
        <>
            <nav className="w-full bg-brand-blue-primary text-white sticky top-0 z-[100] shadow-xl">
                <div className="portal-container flex items-center h-12">

                    {/* Desktop Left */}
                    <div className="hidden md:flex items-center gap-0 flex-1">
                        <Link href="/" className="flex items-center justify-center px-4 h-12 hover:bg-white/5 transition-colors">
                            <Home className="w-4 h-4" />
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-5 h-12 flex items-center text-[11px] font-black uppercase tracking-[0.15em] hover:bg-white/10 transition-all outline-none cursor-pointer border-x border-white/5">
                                Cidades <ChevronDown className="ml-2 w-3 h-3 opacity-60" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56 bg-brand-blue-primary/95 backdrop-blur-md text-white p-3 shadow-2xl rounded-sm border-white/10 mt-1">
                                {SITE_CONFIG.cities.map((city) => (
                                    <DropdownMenuItem key={city} asChild>
                                        <Link href={`/cidade/${slugify(city)}`} className="cursor-pointer font-bold text-xs py-2.5 px-3 hover:bg-white/10 hover:text-brand-red rounded-sm transition-all block">
                                            {city}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center h-12 overflow-hidden">
                            {SITE_CONFIG.categories.slice(1, 5).map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/categoria/${slugify(cat)}`}
                                    className="px-4 h-12 flex items-center text-[11px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors whitespace-nowrap"
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center w-full justify-between">
                        <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                        <Link href="/" className="font-serif font-bold text-lg tracking-tighter">PORTAL SUDOESTE</Link>
                        <Button variant="ghost" size="icon" className="text-white" onClick={() => { setSearchOpen(!searchOpen); setMobileOpen(false) }}>
                            <Search className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-4 text-white/50 border-r border-white/10 pr-6 mr-6 h-12">
                            <Link href={SITE_CONFIG.links.facebook} target="_blank" className="hover:text-white transition-colors">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href={SITE_CONFIG.links.instagram} target="_blank" className="hover:text-white transition-colors">
                                <Instagram className="w-4 h-4" />
                            </Link>
                        </div>

                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="flex items-center gap-2 px-3 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span>Buscar</span>
                        </button>

                        <Link href="/anuncie">
                            <Button className="h-8 rounded-sm px-4 bg-[#d92323] hover:bg-black text-[10px] font-bold uppercase tracking-widest transition-all">
                                Anuncie
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            {searchOpen && (
                <div className="fixed inset-0 z-[200] bg-brand-blue-primary/95 flex items-start justify-center pt-24 px-4">
                    <div className="w-full max-w-2xl space-y-6">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="O que você está procurando?"
                                className="w-full bg-transparent border-b-2 border-white/30 text-white text-2xl md:text-4xl font-serif font-bold placeholder:text-white/30 focus:outline-none focus:border-brand-red pb-4 pr-12"
                            />
                            <button type="submit" className="absolute right-0 bottom-4 text-white/50 hover:text-white">
                                <Search className="w-8 h-8" />
                            </button>
                        </form>
                        <p className="text-white/40 text-sm font-medium">Pressione Enter para buscar ou Esc para fechar</p>
                    </div>
                    <button
                        onClick={() => setSearchOpen(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
            )}

            {/* Mobile Menu Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[150] md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
                    <div className="absolute top-12 left-0 w-80 h-[calc(100vh-48px)] bg-white shadow-2xl overflow-y-auto">
                        <div className="p-6 space-y-6">
                            {/* Search in mobile */}
                            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-sm px-3 py-2">
                                <Search className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar..."
                                    className="bg-transparent text-sm focus:outline-none w-full text-gray-700"
                                />
                            </form>

                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Navegação</h3>
                                <ul className="space-y-1">
                                    <li>
                                        <Link href="/" onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm font-bold text-brand-blue-primary hover:bg-gray-50 rounded">
                                            Página Inicial
                                        </Link>
                                    </li>
                                    {SITE_CONFIG.categories.map(cat => (
                                        <li key={cat}>
                                            <Link href={`/categoria/${slugify(cat)}`} onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm font-bold text-brand-blue-primary hover:bg-gray-50 rounded">
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Cidades</h3>
                                <ul className="space-y-1">
                                    {SITE_CONFIG.cities.map(city => (
                                        <li key={city}>
                                            <Link href={`/cidade/${slugify(city)}`} onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">
                                                {city}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                <Link href="/sobre" onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded">Sobre</Link>
                                <Link href="/contato" onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded">Contato</Link>
                                <Link href="/anuncie" onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm font-bold text-brand-red hover:bg-red-50 rounded">Anuncie</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
