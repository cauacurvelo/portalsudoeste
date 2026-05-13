"use client"

import { usePathname } from "next/navigation"
import { MainNav } from "@/components/layout/MainNav"
import { NewsTicker } from "@/components/layout/NewsTicker"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith("/admin")

    if (isAdmin) {
        return <main className="flex-grow">{children}</main>
    }

    return (
        <>
            <MainNav />
            <NewsTicker />
            <SiteHeader />
            <main className="flex-grow">{children}</main>
            <SiteFooter />
        </>
    )
}
