import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Instagram, Youtube } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { slugify } from "@/lib/utils"

export function SiteFooter() {
    return (
        <footer className="bg-[#0a0a0a] text-gray-300 pt-10 pb-5 border-t-4 border-brand-red">
            <div className="portal-container">
                {/* Mobile: stack everything, Desktop: grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Logo + Desc — full width on mobile */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center gap-3">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/logo.png"
                                alt="Portal do Sudoeste"
                                width={130}
                                height={42}
                                className="h-auto opacity-100"
                            />
                        </Link>
                        <p className="text-[11px] leading-relaxed opacity-60 max-w-xs">
                            18 Anos no Ar! O maior portal de notícias do Sudoeste da Bahia.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link href={SITE_CONFIG.links.facebook} target="_blank" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href={SITE_CONFIG.links.instagram} target="_blank" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href={SITE_CONFIG.links.youtube} target="_blank" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                <Youtube className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div>
                        <h3 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Navegação</h3>
                        <ul className="space-y-2.5 text-[11px] font-medium">
                            <li><Link href="/" className="opacity-70 hover:opacity-100 hover:text-brand-red transition-all">Página Inicial</Link></li>
                            <li><Link href="/sobre" className="opacity-70 hover:opacity-100 hover:text-brand-red transition-all">Sobre o Portal</Link></li>
                            <li><Link href="/anuncie" className="opacity-70 hover:opacity-100 hover:text-brand-red transition-all">Anuncie</Link></li>
                            <li><Link href="/contato" className="opacity-70 hover:opacity-100 hover:text-brand-red transition-all">Contato</Link></li>
                        </ul>
                    </div>

                    {/* Cidades */}
                    <div>
                        <h3 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Cidades</h3>
                        <ul className="space-y-2.5 text-[11px] font-medium">
                            {SITE_CONFIG.cities.slice(0, 5).map(city => (
                                <li key={city}>
                                    <Link href={`/cidade/${slugify(city)}`} className="opacity-70 hover:opacity-100 hover:text-brand-red transition-all">
                                        {city}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Contato</h3>
                        <ul className="space-y-3 text-[11px]">
                            <li className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                                <span className="opacity-70">{SITE_CONFIG.contact.phone}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                                <span className="opacity-70 break-all">{SITE_CONFIG.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-medium text-gray-600 uppercase tracking-wider">
                    <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.</p>
                    <p>Desenvolvido por <span className="text-gray-400 font-bold">Cauã Curvelo</span></p>
                </div>
            </div>
        </footer>
    )
}
