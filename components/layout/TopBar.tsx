import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function TopBar() {
    return (
        <div className="w-full bg-[#000a20] py-1 px-4 hidden md:block border-b border-white/5">
            <div className="container mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-white/50">
                <div className="flex items-center gap-4">
                    <Link href="/contato" className="hover:text-white transition-colors">CONTATO</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href={SITE_CONFIG.links.facebook} target="_blank" className="hover:text-white transition-colors">
                        <Facebook className="w-3.5 h-3.5" />
                    </Link>
                    <Link href={SITE_CONFIG.links.instagram} target="_blank" className="hover:text-white transition-colors">
                        <Instagram className="w-3.5 h-3.5" />
                    </Link>
                    <Link href={SITE_CONFIG.links.youtube} target="_blank" className="hover:text-white transition-colors">
                        <Youtube className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
