"use client"

import { MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function WhatsAppFAB() {
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.phone.replace(/\D/g, "")}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[60] group"
            aria-label="Contato via WhatsApp"
        >
            <div className="absolute -top-12 right-0 bg-white text-brand-blue-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none ring-1 ring-black/5">
                Fale conosco agora!
            </div>
            <div className="bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#128C7E] transition-all animate-bounce hover:animate-none">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
            </div>
        </a>
    )
}
