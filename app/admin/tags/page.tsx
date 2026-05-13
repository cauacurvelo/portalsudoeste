import { Tags, AlertCircle } from "lucide-react"

export default function TagsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Tags (Palavras-chave)</h1>

            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm p-12 max-w-3xl flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Tags className="w-10 h-10 text-gray-400" />
                </div>
                
                <h2 className="text-xl font-bold text-[#1d2327] mb-2">
                    Gerenciamento Automático de Tags
                </h2>
                
                <p className="text-gray-500 max-w-lg mb-6">
                    No novo Portal Sudoeste, não é mais necessário criar uma tag aqui antes de usá-la em uma matéria. O sistema processa as tags automaticamente a partir das palavras que você digita no campo "Tags" ao criar ou editar uma notícia.
                </p>

                <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-sm text-left w-full border border-blue-100 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
                    <div>
                        <strong>Dica de SEO:</strong> Para usar tags de forma eficiente, digite as palavras-chave separadas por vírgula no momento de criar o Post. Isso já vai garantir que o Google encontre sua notícia mais facilmente!
                    </div>
                </div>
            </div>
        </div>
    )
}
