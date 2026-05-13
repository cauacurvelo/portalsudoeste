import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, MessageCircle, Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react"
import { Article, getRelatedArticles } from "@/lib/data/articles-db"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { slugify } from "@/lib/utils"

interface ArticleDetailProps {
    article: Article
}

export async function ArticleDetail({ article }: ArticleDetailProps) {
    const relatedArticles = await getRelatedArticles(article)
    const articleUrl = `https://www.portaldosudoeste.com.br/noticia/${article.slug}`
    const shareText = encodeURIComponent(article.title)
    const shareUrl = encodeURIComponent(articleUrl)

    return (
        <article className="max-w-4xl mx-auto py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
                <Link href="/" className="hover:text-brand-blue-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href={`/categoria/${slugify(article.category)}`} className="hover:text-brand-blue-primary transition-colors">{article.category}</Link>
                {article.city && (
                    <>
                        <span>/</span>
                        <Link href={`/cidade/${slugify(article.city)}`} className="hover:text-brand-blue-primary transition-colors">{article.city}</Link>
                    </>
                )}
            </nav>

            {/* Header */}
            <header className="mb-10 space-y-6">
                <Badge className="bg-brand-red border-none rounded-none text-xs px-3 py-1 font-bold uppercase tracking-widest">
                    {article.category}
                </Badge>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue-primary leading-[1.1] tracking-tight">
                    {article.title}
                </h1>

                <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed border-l-4 border-gray-100 pl-6">
                    {article.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-gray-light">
                            <User className="w-full h-full p-2 text-gray-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-brand-blue-primary uppercase tracking-wider">Por {article.author}</span>
                            <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(article.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {format(new Date(article.date), "HH:mm")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank">
                            <Button size="icon" variant="outline" className="rounded-full w-10 h-10 text-brand-blue-primary border-gray-200 hover:bg-brand-blue-primary hover:text-white transition-all shadow-sm">
                                <Facebook className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank">
                            <Button size="icon" variant="outline" className="rounded-full w-10 h-10 text-brand-blue-primary border-gray-200 hover:bg-brand-blue-primary hover:text-white transition-all shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`} target="_blank">
                            <Button size="icon" variant="outline" className="rounded-full w-10 h-10 bg-[#25D366] text-white border-none hover:bg-[#128C7E] transition-all shadow-md">
                                <MessageCircle className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full mb-12 shadow-2xl rounded-sm overflow-hidden">
                <Image src={article.image} alt={article.title} fill className="object-cover" priority />
                <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                    Foto: Reprodução / Portal do Sudoeste
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:flex-1">
                    <div 
                        className="prose prose-lg max-w-none text-gray-800 font-medium leading-relaxed space-y-6 wp-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-gray-100">
                        <span className="text-xs font-bold text-brand-blue-primary uppercase tracking-widest mr-2 self-center">Tags:</span>
                        {["Sudoeste", "Bahia", article.category, article.city].filter(Boolean).map(tag => (
                            <Badge key={tag} variant="outline" className="rounded-full border-gray-200 text-gray-500 font-bold uppercase text-[10px] px-3 py-1 hover:bg-brand-blue-primary hover:text-white transition-colors cursor-pointer">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Newsletter box below article */}
                    <div className="mt-16 p-10 bg-brand-blue-primary text-white rounded-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-2xl font-serif font-black mb-4">Mantenha-se informado</h3>
                        <p className="text-sm opacity-80 mb-6 max-w-md">Assine nossa newsletter e receba o resumo das notícias do Sudoeste Baiano todas as manhãs.</p>
                        <div className="flex gap-2 max-w-sm">
                            <input type="email" placeholder="Seu e-mail" className="flex-1 bg-white/10 border border-white/20 rounded py-2 px-4 text-sm focus:outline-none focus:bg-white/20" />
                            <Button className="bg-brand-red hover:bg-red-700 font-bold uppercase text-xs px-6">Assinar</Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Mini (Optional for desktop) */}
                <div className="hidden lg:block w-80 shrink-0">
                    <div className="sticky top-24 space-y-12">
                        <div>
                            <h3 className="text-xs font-black uppercase text-brand-blue-primary mb-6 tracking-widest border-l-4 border-brand-red pl-3">Relacionadas</h3>
                            <div className="space-y-6">
                                {relatedArticles.map(related => (
                                    <Link key={related.id} href={`/noticia/${related.slug}`} className="group block cursor-pointer">
                                        <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">{related.category}</span>
                                        <h4 className="font-serif font-bold text-sm leading-tight group-hover:text-brand-blue-primary transition-colors mt-1 line-clamp-3">{related.title}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
