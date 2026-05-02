import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp, Users, Target, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
    title: "Anuncie | Portal do Sudoeste",
    description: "Anuncie no portal mais acessado do Sudoeste Baiano. Sua marca conectada com milhares de pessoas.",
}

export default function AnunciePage() {
    const benefits = [
        { title: "Grande Alcance", desc: "Mais de 1 milhão de visualizações mensais em todo o Sudoeste.", icon: Users },
        { title: "Público Qualificado", desc: "Leitores tomadores de decisão e formadores de opinião.", icon: Target },
        { title: "Formatos Variados", desc: "Banners, Publicposts, Vídeos e Stories nas redes.", icon: BarChart3 },
        { title: "Resultados Reais", desc: "Aumente as vendas e a visibilidade da sua marca com quem entende a região.", icon: TrendingUp },
    ]

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-brand-blue-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red opacity-10 skew-x-12 translate-x-20" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl space-y-8">
                        <span className="text-brand-red font-black uppercase tracking-[0.3em]">Mídia Kit 2026</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-black italic leading-tight">Anuncie no portal mais acessado do Sudoeste</h1>
                        <p className="text-xl opacity-80 leading-relaxed font-medium">Sua marca conectada com milhares de pessoas em Poções, Jequié e Vitória da Conquista todos os dias.</p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/contato">
                                <Button className="bg-brand-red hover:bg-red-700 font-bold uppercase tracking-widest px-8 h-14 text-sm">Solicitar Mídia Kit</Button>
                            </Link>
                            <Link href="/contato">
                                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-brand-blue-primary font-bold uppercase tracking-widest px-8 h-14 text-sm">Solicitar Orçamento</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {benefits.map((item) => (
                        <div key={item.title} className="space-y-4">
                            <div className="w-12 h-12 bg-brand-gray-light rounded-full flex items-center justify-center text-brand-blue-primary">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-serif font-black text-brand-blue-primary italic">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Options */}
            <section className="bg-brand-gray-light py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-black text-brand-blue-primary italic uppercase sm:text-4xl">Formatos Publicitários</h2>
                        <p className="text-gray-500 mt-4">Temos a solução ideal para o seu objetivo de marketing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Publicidade Gráfica", items: ["Banner Topo (728x90)", "Banner Sidebar (300x250)", "Banner Meio da Matéria"] },
                            { name: "Conteúdo Patrocinado", items: ["Publipost (Artigo Exclusivo)", "Entrevista em Vídeo", "Cobertura de Evento"] },
                            { name: "Redes Sociais", items: ["Story no Instagram", "Post no Facebook", "Anúncio no WhatsApp"] },
                        ].map((cat) => (
                            <div key={cat.name} className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
                                <h4 className="font-serif font-black text-xl text-brand-blue-primary mb-8 italic border-b border-brand-red pb-4 inline-block">{cat.name}</h4>
                                <ul className="space-y-4">
                                    {cat.items.map(item => (
                                        <li key={item} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
