import type { Metadata } from "next"
import { Shield, Lock, Eye, Database, Mail, UserCheck } from "lucide-react"

export const metadata: Metadata = {
    title: "Política de Privacidade | Portal do Sudoeste",
    description: "Política de Privacidade do Portal do Sudoeste. Saiba como protegemos seus dados pessoais.",
}

export default function PrivacidadePage() {
    const sections = [
        {
            icon: Database,
            title: "Coleta de Dados",
            content: "Coletamos apenas informações essenciais para a prestação dos nossos serviços, como nome e e-mail quando você se inscreve em nossa newsletter ou entra em contato conosco através do formulário."
        },
        {
            icon: Lock,
            title: "Segurança da Informação",
            content: "Utilizamos protocolos de segurança (SSL/TLS) para proteger a transmissão de dados. Suas informações pessoais são armazenadas em servidores seguros com acesso restrito."
        },
        {
            icon: Eye,
            title: "Uso das Informações",
            content: "As informações coletadas são utilizadas exclusivamente para: envio de newsletters, resposta a contatos, melhoria dos nossos serviços e personalização da experiência do usuário."
        },
        {
            icon: UserCheck,
            title: "Seus Direitos",
            content: "De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a acessar, corrigir, excluir e portar seus dados pessoais. Para exercer esses direitos, entre em contato conosco."
        },
        {
            icon: Shield,
            title: "Cookies",
            content: "Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Você pode gerenciar as preferências de cookies nas configurações do seu navegador."
        },
        {
            icon: Mail,
            title: "Contato sobre Privacidade",
            content: "Para dúvidas ou solicitações sobre sua privacidade e dados pessoais, entre em contato pelo e-mail contato@portaldosudoeste.com.br ou através do nosso formulário de contato."
        },
    ]

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter">
                        Política de Privacidade
                    </h1>
                    <div className="w-24 h-1 bg-brand-red mx-auto" />
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        O Portal do Sudoeste está comprometido com a proteção dos seus dados pessoais, 
                        em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Última atualização: Abril de 2026
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-gray-light rounded-full flex items-center justify-center text-brand-blue-primary">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif font-black text-lg text-brand-blue-primary">{section.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
                        </div>
                    ))}
                </div>

                <footer className="pt-8 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400 font-medium">
                        Esta política pode ser atualizada periodicamente. Recomendamos que você a consulte regularmente.
                    </p>
                </footer>
            </div>
        </div>
    )
}
