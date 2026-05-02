import { getMostReadArticles, getLatestArticles } from "@/lib/data/articles"
import { ArticleCard } from "@/components/news/ArticleCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"
import { NewsletterForm } from "@/components/forms/NewsletterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdSpace } from "@/components/ui/AdSpace"
import { Instagram, Youtube, Facebook } from "lucide-react"

export function Sidebar() {
    const mostRead = getMostReadArticles(5)
    const latestNews = getLatestArticles(5)

    return (
        <aside className="w-full space-y-8">

            {/* Newsletter */}
            <div className="bg-brand-blue-primary p-6 rounded-sm">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-red mb-1">Fique por Dentro</p>
                <h3 className="text-lg font-serif font-black text-white mb-1">Receba no E-mail</h3>
                <p className="text-xs text-white/50 mb-5 font-medium leading-relaxed">As notícias mais importantes do Sudoeste Baiano direto para você.</p>
                <NewsletterForm />
            </div>

            {/* Most Read / Latest Tabs */}
            <div>
                <Tabs defaultValue="maislidas" className="w-full">
                    <div className="flex items-end justify-between mb-5 pb-3 border-b-2 border-gray-100">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">Ranking</p>
                        <TabsList className="bg-transparent rounded-none h-auto p-0 gap-4">
                            <TabsTrigger
                                value="maislidas"
                                className="border-b-2 border-transparent data-[state=active]:border-brand-blue-primary data-[state=active]:text-brand-blue-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none text-[10px] font-black uppercase tracking-wider pb-1"
                            >
                                Mais Lidas
                            </TabsTrigger>
                            <TabsTrigger
                                value="recentes"
                                className="border-b-2 border-transparent data-[state=active]:border-brand-blue-primary data-[state=active]:text-brand-blue-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none text-[10px] font-black uppercase tracking-wider pb-1"
                            >
                                Recentes
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="maislidas" className="space-y-0 mt-0">
                        {mostRead.map((article, index) => (
                            <div key={article.id} className="flex items-start gap-3">
                                <span className="text-3xl font-black text-gray-100 w-8 shrink-0 leading-none pt-3 select-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1">
                                    <ArticleCard article={article} variant="compact" />
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="recentes" className="space-y-0 mt-0">
                        {latestNews.map((article, index) => (
                            <div key={`recent-${article.id}`} className="flex items-start gap-3">
                                <span className="text-3xl font-black text-gray-100 w-8 shrink-0 leading-none pt-3 select-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1">
                                    <ArticleCard article={article} variant="compact" />
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Ad Space */}
            <AdSpace width={300} height={250} />

            {/* Social CTA */}
            <div className="border border-gray-100 rounded-sm p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-red mb-1">Redes Sociais</p>
                <h3 className="text-base font-serif font-black text-brand-blue-primary mb-1">Nos Siga</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">+50K seguidores nos acompanham. Seja um deles.</p>
                <div className="flex flex-col gap-2">
                    <Link href={SITE_CONFIG.links.instagram} target="_blank"
                        className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                        <span className="flex items-center gap-2"><Instagram className="w-3.5 h-3.5" /> Instagram</span>
                        <span className="opacity-60">→</span>
                    </Link>
                    <Link href={SITE_CONFIG.links.facebook} target="_blank"
                        className="flex items-center justify-between px-4 py-2.5 bg-[#1877F2] text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                        <span className="flex items-center gap-2"><Facebook className="w-3.5 h-3.5" /> Facebook</span>
                        <span className="opacity-60">→</span>
                    </Link>
                    <Link href={SITE_CONFIG.links.youtube} target="_blank"
                        className="flex items-center justify-between px-4 py-2.5 bg-[#FF0000] text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                        <span className="flex items-center gap-2"><Youtube className="w-3.5 h-3.5" /> YouTube</span>
                        <span className="opacity-60">→</span>
                    </Link>
                </div>
            </div>

        </aside>
    )
}
