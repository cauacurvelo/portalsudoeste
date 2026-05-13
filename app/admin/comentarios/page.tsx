import { MessageSquareOff } from "lucide-react"

export default function ComentariosPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Comentários</h1>

            <div className="bg-white border border-[#c3c4c7] shadow-sm p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <MessageSquareOff className="w-10 h-10 text-gray-400" />
                </div>
                
                <h2 className="text-xl font-bold text-[#1d2327] mb-2">
                    Nenhum comentário aguardando moderação
                </h2>
                
                <p className="text-gray-500 max-w-md mx-auto">
                    O sistema nativo de comentários foi desativado no novo portal para priorizar a performance. Sugerimos integrar o plugin do Facebook Comments na página da notícia (via código) se desejar reativar as discussões.
                </p>
            </div>
        </div>
    )
}
