import Image from "next/image"
import Link from "next/link"
import { Play, Eye } from "lucide-react"
import { getArticlesWithVideo, getLatestArticles } from "@/lib/data/articles-db"

export async function VideosSection() {
    let videos = await getArticlesWithVideo(4)

    // Fallback in case there are no video articles, just get latest with images
    if (!videos || videos.length < 4) {
        videos = await getLatestArticles(4)
    }

    if (!videos || videos.length === 0) return null

    const [featured, ...rest] = videos

    return (
        <section className="w-full bg-[#0e1220] py-16">
            <div className="portal-container">
                {/* Header */}
                <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-1">Canal Portal</p>
                        <h2 className="text-2xl md:text-3xl font-serif font-black text-white">Vídeos em Destaque</h2>
                    </div>
                    <Link href="/noticias" className="text-[10px] font-black uppercase tracking-widest text-white/30 pb-1 hover:text-brand-red transition-colors">
                        Ver todas as notícias →
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured Video */}
                    <div className="lg:col-span-7 group">
                        <Link href={`/noticia/${featured.slug}`} className="block relative aspect-video overflow-hidden rounded-lg shadow-2xl mb-4 cursor-pointer">
                            <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-brand-red/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                                </div>
                            </div>
                        </Link>
                        <Link href={`/noticia/${featured.slug}`} className="block">
                            <h3 className="text-lg font-serif font-bold text-white group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
                                {featured.title}
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2 flex items-center gap-1.5">
                                <Eye className="w-3 h-3" /> {featured.views ? `${featured.views} visualizações` : 'Novo vídeo'}
                            </p>
                        </Link>
                    </div>

                    {/* Side List */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {rest.map((video) => (
                            <Link key={video.id} href={`/noticia/${video.slug}`} className="group cursor-pointer flex gap-4 items-start p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                                <div className="relative w-36 aspect-video shrink-0 overflow-hidden rounded-sm shadow-lg">
                                    <Image src={video.image} alt={video.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-brand-red transition-all duration-300">
                                            <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 flex-1 pt-1">
                                    <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                                        {video.title}
                                    </h4>
                                    <span className="text-[9px] font-black uppercase tracking-wider text-white/25 flex items-center gap-1">
                                        <Eye className="w-2.5 h-2.5" /> {video.views ? `${video.views} views` : 'Novo'}
                                    </span>
                                </div>
                            </Link>
                        ))}

                        <Link href="/noticias" className="mt-auto flex items-center justify-center gap-2 py-3 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:border-brand-red hover:text-brand-red rounded-sm transition-all duration-300">
                            Mais Notícias →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
