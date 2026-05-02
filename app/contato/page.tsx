import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/constants"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/forms/ContactForm"

export const metadata: Metadata = {
    title: "Fale Conosco | Portal do Sudoeste",
    description: "Entre em contato com a equipe do Portal do Sudoeste. Sugestões de pauta, dúvidas ou anúncios.",
}

export default function ContatoPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter">Fale Conosco</h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">Tire suas dúvidas, envie sugestões de pauta ou fale com nossa equipe comercial. Estamos prontos para te ouvir.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Info */}
                    <div className="space-y-8">
                        <div className="bg-brand-blue-primary text-white p-8 rounded-sm shadow-xl">
                            <h3 className="font-serif font-black text-xl mb-6">Informações de Contato</h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                                    <span className="text-sm opacity-80 leading-relaxed">{SITE_CONFIG.contact.address}</span>
                                </li>
                                <li className="flex gap-4">
                                    <Phone className="w-5 h-5 text-brand-red shrink-0" />
                                    <span className="text-sm opacity-80">{SITE_CONFIG.contact.phone}</span>
                                </li>
                                <li className="flex gap-4">
                                    <Mail className="w-5 h-5 text-brand-red shrink-0" />
                                    <span className="text-sm opacity-80">{SITE_CONFIG.contact.email}</span>
                                </li>
                                <li className="flex gap-4">
                                    <Clock className="w-5 h-5 text-brand-red shrink-0" />
                                    <span className="text-sm opacity-80">Segunda à Sexta: 08:00 - 18:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
