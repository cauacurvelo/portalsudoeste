"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const pathname = usePathname()

    if (pathname !== "/") {
        return null
    }

    return (
        <section className="w-full bg-white py-6 border-b border-gray-100">
            <div className="portal-container flex flex-col items-center justify-center text-center">
                <Link href="/" className="block w-full max-w-[600px]">
                    <div className="relative h-[80px] sm:h-[120px] md:h-[160px] w-full overflow-hidden">
                        <Image
                            src="/images/logoslogan.png"
                            alt="Portal do Sudoeste"
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-contain transition-transform duration-500 ease-out hover:scale-105"
                            priority
                        />
                    </div>
                </Link>
            </div>
        </section>
    )
}

