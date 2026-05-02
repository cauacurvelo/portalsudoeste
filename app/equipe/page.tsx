import type { Metadata } from "next"
import Image from "next/image"
import { Mail, Instagram } from "lucide-react"

export const metadata: Metadata = {
    title: "Equipe de Redação | Portal do Sudoeste",
    description: "Conheça a equipe de jornalistas e colaboradores do Portal do Sudoeste.",
}

const team = [
    {
        name: "Redação Portal",
        role: "Equipe Editorial",
        bio: "Nossa equipe editorial é responsável por apurar, redigir e publicar as principais notícias do Sudoeste Baiano com agilidade e precisão.",
        avatar: "https://i.pravatar.cc/300?u=redacao",
    },
    {
        name: "João Silva",
        role: "Repórter de Economia",
        bio: "Especialista em economia regional, cobrindo agronegócio, mineração e desenvolvimento econômico do Sudoeste.",
        avatar: "https://i.pravatar.cc/300?u=joao",
    },
    {
        name: "Maria Oliveira",
        role: "Repórter de Saúde",
        bio: "Jornalista focada na cobertura de saúde pública, com atenção especial aos municípios da região.",
        avatar: "https://i.pravatar.cc/300?u=maria",
    },
    {
        name: "Carlos Andrade",
        role: "Colunista de Política",
        bio: "Analista político com mais de 15 anos de experiência cobrindo a política municipal e estadual.",
        avatar: "https://i.pravatar.cc/300?u=carlos",
    },
    {
        name: "Juliana Mendes",
        role: "Colunista de Cultura",
        bio: "Jornalista cultural, cobrindo eventos, festivais e a cena artística do Sudoeste Baiano.",
        avatar: "https://i.pravatar.cc/300?u=juliana",
    },
    {
        name: "Roberto Santos",
        role: "Colunista de Economia",
        bio: "Economista e colunista, trazendo análises sobre o cenário econômico regional e nacional.",
        avatar: "https://i.pravatar.cc/300?u=roberto",
    },
]

export default function EquipePage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter">
                        Nossa Equipe
                    </h1>
                    <div className="w-24 h-1 bg-brand-red mx-auto" />
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        Conheça os profissionais que trabalham todos os dias para levar informação 
                        de qualidade ao Sudoeste da Bahia.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member) => (
                        <div key={member.name} className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                            <div className="relative h-64 bg-brand-gray-light">
                                <Image
                                    src={member.avatar}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                    <div className="flex gap-3">
                                        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-blue-primary transition-colors cursor-pointer">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-blue-primary transition-colors cursor-pointer">
                                            <Instagram className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-2">
                                <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">{member.role}</span>
                                <h3 className="font-serif font-black text-xl text-brand-blue-primary">{member.name}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
