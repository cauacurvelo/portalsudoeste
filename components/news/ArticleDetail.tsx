import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, MessageCircle, Calendar, Clock, User, ArrowLeft, Tag, Eye } from "lucide-react"
import { Article, getRelatedArticles } from "@/lib/data/articles-db"
import { AdSpace } from "@/components/ui/AdSpace"
import { slugify } from "@/lib/utils"

interface ArticleDetailProps {
    article: Article
}

function ShareBar({ title, slug }: { title: string; slug: string }) {
    const articleUrl = `https://www.portaldosudoeste.com.br/noticia/${slug}`
    const shareText = encodeURIComponent(title)
    const shareUrl = encodeURIComponent(articleUrl)

    return (
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Compartilhar:</span>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-[11px] font-bold rounded hover:opacity-90 transition-opacity"
            >
                <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
            <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[11px] font-bold rounded hover:opacity-90 transition-opacity"
            >
                <Twitter className="w-3.5 h-3.5" /> Twitter
            </a>
            <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-[11px] font-bold rounded hover:opacity-90 transition-opacity"
            >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
        </div>
    )
}

export async function ArticleDetail({ article }: ArticleDetailProps) {
    const relatedArticles = await getRelatedArticles(article)

    const readingTime = Math.max(1, Math.ceil(
        (article.content?.replace(/<[^>]+>/g, '') || '').split(' ').length / 200
    ))

    return (
        <div className="bg-[#f7f7f8] min-h-screen">
            {/* Hero Banner */}
            <div className="relative w-full bg-brand-blue-primary" style={{ minHeight: '420px' }}>
                {article.image && (
                    <>
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover opacity-30"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-primary via-brand-blue-primary/80 to-brand-blue-primary/50" />
                    </>
                )}

                <div className="relative z-10 portal-container pt-10 pb-14">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[11px] font-bold text-white/50 uppercase tracking-widest mb-8">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                            <ArrowLeft className="w-3 h-3" /> Home
                        </Link>
                        <span>/</span>
                        <Link href={`/categoria/${slugify(article.category)}`} className="hover:text-white transition-colors">
                            {article.category}
                        </Link>
                        {article.city && (
                            <>
                                <span>/</span>
                                <Link href={`/cidade/${slugify(article.city)}`} className="hover:text-white transition-colors">
                                    {article.city}
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Category badge */}
                    <span className="inline-block bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 mb-5">
                        {article.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-[1.1] tracking-tight max-w-4xl mb-6">
                        {article.title}
                    </h1>

                    {/* Summary */}
                    {article.summary && (
                        <p className="text-lg text-white/70 max-w-3xl leading-relaxed border-l-4 border-brand-red/60 pl-5 mb-8">
                            {article.summary}
                        </p>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-white/50 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {article.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(article.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime} min de leitura
                        </span>
                        {article.views > 0 && (
                            <span className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                {article.views.toLocaleString('pt-BR')} visualizações
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="portal-container -mt-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Article Body */}
                    <main className="lg:col-span-8">
                        {/* White card that "lifts" from the hero */}
                        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">

                            {/* Featured Image */}
                            {article.image && (
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 800px"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">
                                            Foto: Reprodução / Portal do Sudoeste
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Top share bar */}
                            <div className="px-6 md:px-10 pt-6 pb-4 border-b border-gray-100">
                                <ShareBar title={article.title} slug={article.slug} />
                            </div>

                            {/* Content */}
                            <div className="px-6 md:px-10 py-8">
                                <div
                                    className="article-body wp-content"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>

                            {/* Tags */}
                            {(article.tags && article.tags.length > 0 || article.category || article.city) && (
                                <div className="px-6 md:px-10 pb-6 pt-2 border-t border-gray-100 flex flex-wrap gap-2 items-center">
                                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                                    {[article.category, article.city, ...(article.tags || [])].filter(Boolean).slice(0, 6).map(tag => (
                                        <Link
                                            key={tag}
                                            href={`/busca?q=${encodeURIComponent(tag!)}`}
                                            className="text-[10px] font-black uppercase tracking-wider text-gray-500 bg-gray-100 hover:bg-brand-blue-primary hover:text-white px-3 py-1.5 rounded transition-all"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Bottom share bar */}
                            <div className="px-6 md:px-10 py-6 border-t border-gray-100 bg-gray-50">
                                <ShareBar title={article.title} slug={article.slug} />
                            </div>
                        </div>

                        {/* Author card */}
                        <div className="bg-white rounded-sm border border-gray-100 shadow-sm mt-6 p-6 flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-brand-blue-primary flex items-center justify-center shrink-0">
                                <User className="w-7 h-7 text-white/60" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-brand-red mb-1">Escrito por</p>
                                <p className="font-serif font-black text-brand-blue-primary text-lg">{article.author}</p>
                                <p className="text-sm text-gray-500 mt-1">Redação Portal do Sudoeste — Notícias de Poções e região.</p>
                            </div>
                        </div>

                        {/* Related articles */}
                        {relatedArticles.length > 0 && (
                            <div className="mt-8">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-brand-red rounded-full" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-brand-blue-primary">
                                        Notícias Relacionadas
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {relatedArticles.map(related => (
                                        <Link key={related.id} href={`/noticia/${related.slug}`} className="group bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="relative aspect-[16/9]">
                                                <Image
                                                    src={related.image}
                                                    alt={related.title}
                                                    fill
                                                    sizes="300px"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-brand-red">{related.category}</span>
                                                <h3 className="font-serif font-bold text-sm leading-snug text-gray-800 group-hover:text-brand-blue-primary transition-colors mt-1 line-clamp-3">
                                                    {related.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>

                    {/* Sticky Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-20 space-y-6">
                            {/* Ad */}
                            <AdSpace position="meio" />

                            {/* Newsletter */}
                            <div className="bg-brand-blue-primary rounded-sm p-6 text-white">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-red mb-1">Fique por dentro</p>
                                <h3 className="font-serif font-black text-xl mb-2">Receba no E-mail</h3>
                                <p className="text-xs text-white/50 mb-4 leading-relaxed">As notícias mais importantes do Sudoeste Baiano direto para você.</p>
                                <input
                                    type="email"
                                    placeholder="Seu melhor e-mail"
                                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 mb-3"
                                />
                                <button className="w-full bg-brand-red hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-widest py-2.5 rounded transition-colors">
                                    Assinar Grátis
                                </button>
                            </div>

                            {/* Most recent */}
                            {relatedArticles.length > 0 && (
                                <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-5">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-blue-primary mb-4 pb-3 border-b border-gray-100">
                                        Mais Lidas
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedArticles.map((a, i) => (
                                            <Link key={a.id} href={`/noticia/${a.slug}`} className="group flex gap-3 items-start">
                                                <span className="text-3xl font-black text-gray-100 w-8 shrink-0 leading-none select-none">{String(i + 1).padStart(2, '0')}</span>
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-700 group-hover:text-brand-blue-primary transition-colors line-clamp-3 leading-snug">
                                                        {a.title}
                                                    </h4>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1 block">
                                                        {format(new Date(a.date), "dd/MM/yyyy")}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
