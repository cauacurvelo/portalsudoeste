"use client"

import { Save, Globe, Shield, Info } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export default function ConfiguracoesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Configurações Gerais</h1>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-yellow-800 flex gap-3 rounded-sm">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                    <p className="font-bold">Configurações do Portal</p>
                    <p>As configurações principais do site são gerenciadas via código para garantir máxima performance de SEO. Abaixo estão as informações atuais do portal.</p>
                </div>
            </div>

            <div className="bg-white border border-[#c3c4c7] shadow-sm max-w-3xl rounded-sm overflow-hidden">
                <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#2271b1]" />
                    <h2 className="font-semibold text-[14px] text-[#1d2327]">Informações do Site</h2>
                </div>

                <div className="divide-y divide-[#f0f0f1]">
                    {[
                        { label: "Nome do Site", value: SITE_CONFIG.name },
                        { label: "URL do Site", value: SITE_CONFIG.url },
                        { label: "E-mail de Contato", value: SITE_CONFIG.contact.email },
                        { label: "Telefone", value: SITE_CONFIG.contact.phone },
                        { label: "Endereço", value: SITE_CONFIG.contact.address },
                        { label: "Instagram", value: SITE_CONFIG.links.instagram },
                        { label: "Facebook", value: SITE_CONFIG.links.facebook },
                        { label: "YouTube", value: SITE_CONFIG.links.youtube },
                    ].map(item => (
                        <div key={item.label} className="grid grid-cols-1 md:grid-cols-4 gap-2 px-4 py-3 items-center">
                            <label className="text-[13px] font-semibold text-[#1d2327] col-span-1">{item.label}</label>
                            <div className="md:col-span-3">
                                <input
                                    type="text"
                                    readOnly
                                    value={item.value}
                                    className="w-full border border-[#c3c4c7] p-2 text-[13px] rounded-sm bg-gray-50 text-gray-500 cursor-default select-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-[#c3c4c7] shadow-sm max-w-3xl rounded-sm overflow-hidden">
                <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#2271b1]" />
                    <h2 className="font-semibold text-[14px] text-[#1d2327]">Segurança e Acesso</h2>
                </div>
                <div className="p-4 text-[13px] text-[#3c434a] space-y-2">
                    <p>Para alterar o login e a senha de acesso ao admin:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-[#646970]">
                        <li>Acesse o painel da <strong className="text-[#1d2327]">Vercel</strong></li>
                        <li>Navegue até <em>Settings → Environment Variables</em></li>
                        <li>Altere as chaves <code className="bg-gray-100 px-1 rounded">ADMIN_USERNAME</code> e <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code></li>
                        <li>Faça um novo deploy para aplicar as mudanças</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}
