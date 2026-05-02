import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { LatestNews } from "@/components/home/LatestNews";
import { Sidebar } from "@/components/home/Sidebar";
import { ARTICLES, getLatestArticles } from "@/lib/data/articles";
import { ArticleCard } from "@/components/news/ArticleCard";
import { VideosSection } from "@/components/home/VideosSection";
import { AdSpace } from "@/components/ui/AdSpace";
import { slugify } from "@/lib/utils";
import { MapPin } from "lucide-react";

function SectionHeading({ label, title, href }: { label?: string; title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-gray-100">
      <div>
        {label && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-1">{label}</p>}
        <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-blue-primary leading-none">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-red transition-colors pb-1">
          Ver todas →
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const trending = getLatestArticles(4);

  return (
    <div className="flex flex-col w-full bg-[#fafafa]">
      <div className="portal-container py-10">
        {/* Hero Section */}
        <HeroCarousel />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-14">

            {/* Em Alta */}
            <section>
              <SectionHeading label="Destaques" title="Em Alta Agora" />
              <div className="bg-white rounded-sm border border-gray-100 shadow-sm divide-y divide-gray-50 px-4">
                {trending.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </section>

            {/* Ad Banner */}
            <AdSpace label="Publicidade" width={728} height={90} />

            {/* Últimas Notícias */}
            <section>
              <SectionHeading label="Redação" title="Últimas Notícias" href="/noticias" />
              <LatestNews />
            </section>

            {/* Cidades Section */}
            <section className="relative overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-brand-blue-primary" />
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">Cobertura Regional</p>
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-white leading-tight">Notícias por Cidade</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Poções", "Jequié", "Vitória da Conquista"].map(city => (
                      <Link key={city} href={`/cidade/${slugify(city)}`}
                        className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-white/20 text-white/80 hover:bg-brand-red hover:border-brand-red hover:text-white transition-all rounded-full">
                        <MapPin className="w-3 h-3" /> {city}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ARTICLES.slice(4, 7).map(article => (
                    <Link key={article.id} href={`/noticia/${article.slug}`} className="group block">
                      <div className="relative aspect-video mb-3 overflow-hidden rounded-sm ring-1 ring-white/10 shadow-xl">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <h4 className="font-serif font-bold text-sm leading-snug text-white group-hover:text-brand-red transition-colors line-clamp-2">{article.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <VideosSection />
    </div>
  );
}
