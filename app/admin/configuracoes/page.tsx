"use client"

import { useState } from "react"
import { Save, Globe } from "lucide-react"

export default function ConfiguracoesPage() {
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        setTimeout(() => {
            setSaving(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 1000)
    }

    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Configurações Gerais</h1>

            <div className="bg-white border border-[#c3c4c7] shadow-sm max-w-3xl">
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                        <label className="text-[14px] font-semibold text-[#1d2327] md:pt-2">Título do Site</label>
                        <div className="md:col-span-3">
                            <input 
                                type="text" 
                                defaultValue="Portal do Sudoeste" 
                                className="w-full border border-[#8c8f94] p-2 text-[14px] focus:border-[#2271b1] outline-none rounded-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                disabled
                            />
                            <p className="text-[12px] text-gray-500 mt-1">O título é definido nas configurações do código (SEO) para melhor indexação.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-t border-gray-100 pt-6">
                        <label className="text-[14px] font-semibold text-[#1d2327] md:pt-2">Endereço (URL)</label>
                        <div className="md:col-span-3">
                            <input 
                                type="url" 
                                defaultValue="https://www.portaldosudoeste.com.br" 
                                className="w-full border border-[#8c8f94] p-2 text-[14px] focus:border-[#2271b1] outline-none rounded-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-t border-gray-100 pt-6">
                        <label className="text-[14px] font-semibold text-[#1d2327] md:pt-2">Fuso Horário</label>
                        <div className="md:col-span-3">
                            <select className="w-full max-w-xs border border-[#8c8f94] p-2 text-[14px] focus:border-[#2271b1] outline-none rounded-sm">
                                <option>São Paulo (UTC-3)</option>
                                <option>Brasília (UTC-3)</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="bg-[#2271b1] text-white px-6 py-2 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                        {saved && <span className="text-green-600 font-bold text-sm">Configurações salvas!</span>}
                    </div>
                </form>
            </div>
        </div>
    )
}
