"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { Article } from "@/lib/data/articles-db"

interface NewsTickerClientProps {
    articles: Article[]
}

export function NewsTickerClient({ articles }: NewsTickerClientProps) {
    const pathname = usePathname()

    if (pathname.startsWith('/admin')) return null

    const headlines = [...articles, ...articles]

    return (
        <div className="w-full bg-white border-b border-gray-200 h-9 flex items-center overflow-hidden">
            <div className="flex items-center h-full w-full overflow-hidden">
                <div className="flex items-center gap-1.5 bg-brand-blue-primary text-white text-[9px] sm:text-[10px] font-black tracking-[0.1em] px-3 h-full shrink-0 z-10 relative">
                    <TrendingUp className="w-3 h-3 shrink-0" />
                    <span className="whitespace-nowrap">PLANTÃO</span>
                    <svg className="absolute right-[-9px] top-0 h-full w-[10px] fill-brand-blue-primary" viewBox="0 0 10 36" preserveAspectRatio="none">
                        <polygon points="0,0 10,18 0,36" />
                    </svg>
                </div>

                <div className="flex-1 overflow-hidden h-full flex items-center ml-3">
                    <div
                        className="flex items-center whitespace-nowrap gap-10 text-[10px] sm:text-[11px] font-semibold text-gray-700 uppercase tracking-wide animate-ticker-scroll"
                        style={{ willChange: "transform" }}
                    >
                        {headlines.map((article, i) => (
                            <Link
                                key={`${article.id}-${i}`}
                                href={`/noticia/${article.slug}`}
                                className="inline-flex items-center gap-2 hover:text-brand-red transition-colors shrink-0"
                            >
                                <span className="w-1 h-1 bg-brand-red rounded-full shrink-0" />
                                <span>{article.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}
