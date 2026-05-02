import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { slugify } from "@/lib/utils"

export function SiteFooter() {
    return (
        <footer className="bg-[#0a0a0a] text-gray-300 pt-12 pb-6 border-t-4 border-brand-red">
            <div className="portal-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <Image
                                src="/images/logo.png"
                                alt="Portal do Sudoeste"
                                width={140}
                                height={45}
                                className="h-auto opacity-100"
                            />
                        </Link>
                        <p className="text-xs leading-relaxed opacity-70 max-w-xs">
                            O Portal do Sudoeste é a sua fonte de notícias mais confiável da região, levando informação com independência e autenticidade.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link href={SITE_CONFIG.links.facebook} className="text-gray-400 hover:text-white transition-colors p-1.5 bg-white/5 rounded-full">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href={SITE_CONFIG.links.instagram} className="text-gray-400 hover:text-white transition-colors p-1.5 bg-white/5 rounded-full">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href={SITE_CONFIG.links.youtube} className="text-gray-400 hover:text-white transition-colors p-1.5 bg-white/5 rounded-full">
                                <Youtube className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Links Rápidos</h3>
                        <ul className="space-y-2 text-[11px] font-medium">
                            <li><Link href="/" className="hover:text-brand-red transition-colors">Página Inicial</Link></li>
                            <li><Link href="/sobre" className="hover:text-brand-red transition-colors">Sobre o Portal</Link></li>
                            <li><Link href="/anuncie" className="hover:text-brand-red transition-colors">Anuncie Conosco</Link></li>
                            <li><Link href="/contato" className="hover:text-brand-red transition-colors">Fale Conosco</Link></li>
                        </ul>
                    </div>

                    <div className="hidden lg:block">
                        <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Cidades</h3>
                        <ul className="space-y-2 text-[11px] font-medium">
                            {SITE_CONFIG.cities.slice(0, 4).map(city => (
                                <li key={city}><Link href={`/cidade/${slugify(city)}`} className="hover:text-brand-red transition-colors">{city}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Contato</h3>
                        <ul className="space-y-3 text-[11px]">
                            <li className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-brand-red" />
                                <span className="opacity-80">{SITE_CONFIG.contact.phone}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-brand-red" />
                                <span className="opacity-80">{SITE_CONFIG.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    <p>© {new Date().getFullYear()} {SITE_CONFIG.name}.</p>
                    <p className="flex items-center gap-1">
                        Desenvolvido por <span className="text-gray-400 font-bold">Cauã Curvelo</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
