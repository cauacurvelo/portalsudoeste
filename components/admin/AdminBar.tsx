"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plus, Edit3, Globe, User } from "lucide-react"

export function AdminBar() {
    const [isAdmin, setIsAdmin] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        // Simple check for admin session cookie
        const cookies = document.cookie.split(';')
        const hasSession = cookies.some(c => c.trim().startsWith('admin_session=authenticated'))
        setIsAdmin(hasSession)
    }, [pathname])

    if (!isAdmin || pathname.startsWith('/admin')) return null

    // Attempt to extract slug if we are on a news page
    const newsMatch = pathname.match(/^\/noticia\/([^\/]+)/)
    const currentSlug = newsMatch ? newsMatch[1] : null

    return (
        <div className="bg-[#1d2327] text-[#c3c4c7] h-8 flex items-center justify-between px-4 text-[12px] sticky top-0 z-[9999] border-b border-black/20">
            <div className="flex items-center gap-0 h-full">
                <Link 
                    href="/admin" 
                    className="flex items-center gap-1.5 h-full px-3 hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors font-semibold"
                >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Painel Administrativo</span>
                </Link>
                
                <div className="w-px h-4 bg-white/10 mx-1" />
                
                <Link 
                    href="/admin/noticias/nova" 
                    className="flex items-center gap-1.5 h-full px-3 hover:bg-[#2c3338] hover:text-white transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Novo Post</span>
                </Link>

                {currentSlug && (
                    <>
                        <div className="w-px h-4 bg-white/10 mx-1" />
                        <Link 
                            href={`/admin/noticias?q=${currentSlug}`} // Link to the list filtered by slug is safer for now as we don't have ID on public page easily
                            className="flex items-center gap-1.5 h-full px-3 hover:bg-[#2c3338] hover:text-white transition-colors text-brand-red font-bold"
                        >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Gerenciar este Post</span>
                        </Link>
                    </>
                )}
            </div>

            <div className="flex items-center gap-4 h-full">
                <div className="flex items-center gap-2 px-3">
                    <User className="w-3.5 h-3.5 text-[#a7aaad]" />
                    <span className="font-medium">Olá, Admin</span>
                </div>
            </div>
        </div>
    )
}
