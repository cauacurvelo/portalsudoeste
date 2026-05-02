"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ARTICLES } from "@/lib/data/articles"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function HeroCarousel() {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const autoplay = React.useRef(Autoplay({ delay: 6000, stopOnInteraction: true }))
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])

    const featured = ARTICLES.filter(a => a.featured).slice(0, 5)

    React.useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on("select", onSelect)
        onSelect()
        return () => { emblaApi.off("select", onSelect) }
    }, [emblaApi])

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    return (
        <section className="w-full mb-2">
            <div
                className="relative w-full overflow-hidden rounded-lg shadow-2xl"
                onMouseEnter={() => autoplay.current.stop()}
                onMouseLeave={() => autoplay.current.reset()}
            >
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex">
                        {featured.map((article, index) => (
                            <div key={article.id} className="min-w-0 shrink-0 grow-0 basis-full">
                                <Link
                                    href={`/noticia/${article.slug}`}
                                    className="relative block group aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
                                >
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                        sizes="100vw"
                                    />
                                    {/* Gradient stronger on mobile for readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-brand-blue-primary/70 via-transparent to-transparent" />

                                    {/* Content — mobile-first layout */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 lg:p-16">
                                        <div className="max-w-2xl">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-brand-red text-white text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] rounded-full px-3 py-1">
                                                    {article.category}
                                                </span>
                                                {article.city && (
                                                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/60 hidden sm:block">
                                                        {article.city}
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black leading-[1.15] text-white mb-3 drop-shadow-lg line-clamp-3 sm:line-clamp-none">
                                                {article.title}
                                            </h2>

                                            <p className="hidden sm:block text-white/70 text-sm max-w-lg line-clamp-2 mb-3 pl-3 border-l-2 border-brand-red/60">
                                                {article.summary}
                                            </p>

                                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest hidden sm:block">
                                                {format(new Date(article.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls — always visible on mobile, bottom-right on desktop */}
                <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-6 flex items-center gap-2 z-20">
                    {/* Dots */}
                    <div className="flex items-center gap-1.5 mr-2">
                        {featured.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={`rounded-full transition-all duration-300 ${i === selectedIndex ? 'w-5 h-1.5 bg-brand-red' : 'w-1.5 h-1.5 bg-white/40'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={scrollPrev}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-black/30 hover:bg-brand-red border border-white/20 text-white transition-all backdrop-blur-sm rounded-full"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-black/30 hover:bg-brand-red border border-white/20 text-white transition-all backdrop-blur-sm rounded-full"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}
