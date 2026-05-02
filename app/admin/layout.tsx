"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Plus,
    Bell,
    Globe,
    ChevronRight,
    Newspaper,
    Tags,
    Folder,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/lib/actions/auth"

const menuGroups = [
    {
        items: [
            { title: "Painel", icon: LayoutDashboard, href: "/admin" },
        ]
    },
    {
        label: "Conteúdo",
        items: [
            {
                title: "Posts", icon: Newspaper, href: "/admin/noticias",
                children: [
                    { title: "Todos os Posts", href: "/admin/noticias" },
                    { title: "Adicionar Novo", href: "/admin/noticias/nova" },
                    { title: "Categorias", href: "#" },
                    { title: "Tags", href: "#" },
                ]
            },
            { title: "Mídia", icon: ImageIcon, href: "#" },
            { title: "Páginas", icon: FileText, href: "#" },
            { title: "Comentários", icon: MessageSquare, href: "#", badge: "3" },
        ]
    },
    {
        label: "Configurações",
        items: [
            { title: "Usuários", icon: Users, href: "#" },
            { title: "Configurações", icon: Settings, href: "#" },
        ]
    },
]

function SidebarItem({ item, pathname }: { item: any; pathname: string }) {
    const isActive = item.href !== "#" && (
        item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
    )
    const hasChildren = item.children && item.children.length > 0
    const childActive = hasChildren && item.children.some((c: any) => pathname === c.href)

    return (
        <div>
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-[13px] transition-all duration-150 group relative",
                    isActive || childActive
                        ? "bg-[#2271b1] text-white"
                        : "text-[#a7aaad] hover:bg-[#2c3338] hover:text-white"
                )}
            >
                {(isActive || childActive) && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
                )}
                <item.icon className={cn(
                    "w-4 h-4 shrink-0",
                    isActive || childActive ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]"
                )} />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                    <span className="bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {item.badge}
                    </span>
                )}
            </Link>

            {/* Submenu */}
            {hasChildren && (isActive || childActive || pathname.startsWith(item.href)) && (
                <div className="bg-[#32373c] py-1">
                    {item.children.map((child: any) => (
                        <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                                "flex items-center gap-2 pl-11 pr-4 py-2 text-[12px] transition-colors",
                                pathname === child.href
                                    ? "text-white"
                                    : "text-[#a7aaad] hover:text-white"
                            )}
                        >
                            <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                            {child.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    if (pathname === "/admin/login") return <>{children}</>

    return (
        <div className="flex h-screen bg-[#f0f0f1] font-sans text-[13px] text-[#3c434a] overflow-hidden">

            {/* ── WordPress-style Admin Sidebar ── */}
            <aside className="w-[160px] bg-[#1d2327] flex flex-col shrink-0 overflow-y-auto">
                {/* Logo area */}
                <div className="flex items-center gap-2 px-4 py-4 border-b border-white/5">
                    <div className="w-7 h-7 bg-[#2271b1] rounded-sm flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-white text-[11px] font-bold leading-tight">Portal</p>
                        <p className="text-[#a7aaad] text-[10px]">Sudoeste</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-2">
                    {menuGroups.map((group, gi) => (
                        <div key={gi} className="mb-2">
                            {group.label && (
                                <p className="px-4 py-1.5 text-[10px] font-bold text-[#6c7781] uppercase tracking-widest">
                                    {group.label}
                                </p>
                            )}
                            {group.items.map((item) => (
                                <SidebarItem key={item.title} item={item} pathname={pathname} />
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="border-t border-white/5 shrink-0">
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#a7aaad] hover:text-white hover:bg-[#2c3338] transition-all text-left"
                        >
                            <LogOut className="w-4 h-4 shrink-0" />
                            Sair
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* WordPress Admin Bar (top) */}
                <header className="h-8 bg-[#1d2327] text-[#c3c4c7] flex items-center justify-between px-4 shrink-0 z-50 border-b border-black/20">
                    <div className="flex items-center gap-0 h-full text-[12px]">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-1.5 h-full px-3 hover:bg-[#2c3338] hover:text-white transition-colors"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span className="hidden sm:block">Ver Site</span>
                        </Link>
                        <div className="w-px h-4 bg-white/10" />
                        <Link
                            href="/admin/noticias/nova"
                            className="flex items-center gap-1.5 h-full px-3 hover:bg-[#2c3338] hover:text-white transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Novo Post</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-0 h-full">
                        <button className="relative flex items-center gap-1 h-full px-3 hover:bg-[#2c3338] hover:text-white transition-colors">
                            <Bell className="w-3.5 h-3.5" />
                            <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-brand-red rounded-full" />
                        </button>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2 h-full px-3 hover:bg-[#2c3338] hover:text-white cursor-pointer transition-colors">
                            <div className="w-5 h-5 rounded-sm bg-[#2271b1] flex items-center justify-center text-white text-[10px] font-bold">
                                A
                            </div>
                            <span>Admin</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
