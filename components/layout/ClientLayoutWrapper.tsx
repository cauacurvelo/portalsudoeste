"use client"

import { usePathname } from "next/navigation"

interface ClientLayoutWrapperProps {
    children: React.ReactNode
    nav: React.ReactNode
    ticker: React.ReactNode
    header: React.ReactNode
    footer: React.ReactNode
}

export function ClientLayoutWrapper({
    children,
    nav,
    ticker,
    header,
    footer
}: ClientLayoutWrapperProps) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith("/admin")

    if (isAdmin) {
        return <main className="flex-grow">{children}</main>
    }

    return (
        <>
            {nav}
            {ticker}
            {header}
            <main className="flex-grow">{children}</main>
            {footer}
        </>
    )
}
