"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const pathname = usePathname()

    return (
        <section className="w-full bg-white py-3 sm:py-5 md:py-6 border-b border-gray-100">
            <div className="portal-container flex flex-col items-center justify-center text-center">
                <Link href="/" className="block w-full max-w-[500px]">
                    <div className="relative h-[60px] sm:h-[90px] md:h-[130px] w-full overflow-hidden">
                        <Image
                            src="/images/logo.png"
                            alt="Portal do Sudoeste"
                            fill
                            sizes="(max-width: 640px) 90vw, 500px"
                            className="object-contain transition-transform duration-500 ease-out hover:scale-105"
                            priority
                        />
                    </div>
                </Link>
            </div>
        </section>
    )
}

