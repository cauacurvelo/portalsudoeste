"use client"

import Link from "next/link"
import { ARTICLES } from "@/lib/data/articles"
import { TrendingUp } from "lucide-react"
import { usePathname } from "next/navigation"

export function NewsTicker() {
    const pathname = usePathname()
    const headlines = ARTICLES.slice(0, 8)

    if (pathname.startsWith('/admin')) {
        return null
    }

    return (
        <div className="w-full bg-white border-b border-gray-200 h-10 flex items-center overflow-hidden">
            <div className="portal-container flex items-center h-full gap-0 overflow-hidden">
                {/* Label */}
                <div className="flex items-center gap-2 bg-brand-blue-primary text-white text-[10px] font-black tracking-[0.12em] px-4 h-full shrink-0 z-10">
                    <TrendingUp className="w-3 h-3" />
                    <span>PLANTÃO</span>
                    {/* Arrow chevron */}
                    <svg className="ml-2 -mr-4 h-10 w-4 text-brand-blue-primary fill-current" viewBox="0 0 16 40" preserveAspectRatio="none">
                        <polygon points="0,0 16,20 0,40" />
                    </svg>
                </div>

                {/* Scrolling text */}
                <div className="flex-1 overflow-hidden relative h-full ml-4">
                    <div className="flex items-center h-full whitespace-nowrap animate-scroll-text gap-16 text-[11px] font-semibold text-gray-700 uppercase tracking-wide hover:[animation-play-state:paused]">
                        {[...headlines, ...headlines].map((article, i) => (
                            <Link
                                key={`${article.id}-${i}`}
                                href={`/noticia/${article.slug}`}
                                className="inline-flex items-center gap-2 hover:text-brand-red transition-colors shrink-0"
                            >
                                <span>{article.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
