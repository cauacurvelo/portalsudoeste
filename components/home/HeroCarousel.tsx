"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
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
                className="relative w-full overflow-hidden rounded-xl shadow-2xl"
                onMouseEnter={() => autoplay.current.stop()}
                onMouseLeave={() => autoplay.current.reset()}
            >
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex">
                        {featured.map((article, index) => (
                            <div key={article.id} className="min-w-0 shrink-0 grow-0 basis-full">
                                <Link href={`/noticia/${article.slug}`} className="relative block group" style={{ aspectRatio: '21/9' }}>
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        priority={index === 0}
                                    />
                                    {/* Layered gradients for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-primary/85 via-brand-blue-primary/25 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-primary/95 via-transparent to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
                                        <motion.div
                                            initial={{ opacity: 0, y: 24 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                            className="max-w-3xl"
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <Badge className="bg-brand-red text-white border-none px-4 py-1.5 font-black uppercase tracking-[0.2em] text-[9px] rounded-full shadow-lg">
                                                    {article.category}
                                                </Badge>
                                                {article.city && (
                                                    <>
                                                        <span className="w-1 h-1 bg-white/30 rounded-full" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/70">{article.city}</span>
                                                    </>
                                                )}
                                            </div>

                                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black leading-[1.1] mb-5 text-white drop-shadow-md group-hover:text-brand-red/90 transition-colors duration-500">
                                                {article.title}
                                            </h2>

                                            <p className="hidden md:block text-white/75 text-base max-w-xl line-clamp-2 font-medium leading-relaxed mb-6 pl-4 border-l-2 border-brand-red/70">
                                                {article.summary}
                                            </p>

                                            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">
                                                {format(new Date(article.date), "dd MMMM, yyyy", { locale: ptBR })}
                                            </p>
                                        </motion.div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Controls */}
                <div className="absolute bottom-6 right-8 md:right-16 flex items-center gap-3 z-20">
                    {/* Dots */}
                    <div className="flex items-center gap-1.5 mr-3">
                        {featured.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={`rounded-full transition-all duration-300 ${i === selectedIndex ? 'w-6 h-1.5 bg-brand-red' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={scrollPrev}
                        className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-brand-red border border-white/15 text-white transition-all duration-300 backdrop-blur-sm rounded-full"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-brand-red border border-white/15 text-white transition-all duration-300 backdrop-blur-sm rounded-full"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}
