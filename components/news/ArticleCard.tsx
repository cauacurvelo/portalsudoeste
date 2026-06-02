"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Article } from "@/lib/data/articles-db"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface ArticleCardProps {
    article: Article
    variant?: "default" | "horizontal" | "compact"
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
    const readingTime = Math.max(1, Math.ceil(article.summary.split(' ').length / 15))

    if (variant === "horizontal") {
        return (
            <Link href={`/noticia/${article.slug}`}
                className="group flex flex-col sm:flex-row gap-5 py-5 px-2 last:border-0 hover:bg-gray-50/80 transition-all duration-300 rounded-sm">
                <div className="relative w-full sm:w-44 aspect-[4/3] sm:aspect-auto sm:h-28 shrink-0 overflow-hidden rounded-sm bg-gray-100">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2 justify-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-red bg-red-50 px-2.5 py-1 rounded-full w-fit">
                        {article.category}
                    </span>
                    <h3 className="text-base font-serif font-bold leading-snug text-brand-blue-primary group-hover:text-brand-red transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-auto">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readingTime} min</span>
                        <span className="opacity-60">•</span>
                        <span>{format(new Date(article.date), "dd/MM/yyyy")}</span>
                    </div>
                </div>
            </Link>
        )
    }

    if (variant === "compact") {
        return (
            <Link href={`/noticia/${article.slug}`}
                className="group flex gap-3 py-4 border-b border-gray-100 last:border-0 items-center hover:translate-x-1 transition-all duration-300">
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-sm bg-gray-100">
                    <Image src={article.image} alt={article.title} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-bold font-serif leading-snug text-gray-800 group-hover:text-brand-blue-primary transition-colors line-clamp-2">
                        {article.title}
                    </h4>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                        {format(new Date(article.date), "dd/MM")}
                    </span>
                </div>
            </Link>
        )
    }

    return (
        <Link href={`/noticia/${article.slug}`} className="group flex flex-col gap-4 animate-in fade-in duration-700">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 rounded-sm shadow-sm">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-blue-primary/0 group-hover:bg-brand-blue-primary/10 transition-all duration-500" />
                <div className="absolute top-3 left-3">
                    <Badge className="bg-brand-red text-white border-none rounded-full text-[9px] py-1 px-3 font-black uppercase tracking-widest shadow-md">
                        {article.category}
                    </Badge>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-serif font-black leading-tight text-brand-blue-primary group-hover:text-brand-red transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-[13px] text-gray-500 line-clamp-4 leading-relaxed mt-1">
                    {article.summary}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <span className="text-brand-blue-primary/50 font-bold">{article.city || "Região"}</span>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readingTime} min</span>
                        <span className="opacity-40">·</span>
                        <span>{format(new Date(article.date), "dd MMM", { locale: ptBR })}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
