import { Shield, Key, User } from "lucide-react"

export default function UsuariosPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-[23px] text-[#1d2327] font-normal font-sans">Usuários do Sistema</h1>

            <div className="bg-white border border-[#c3c4c7] shadow-sm rounded-sm p-6 max-w-2xl">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#2271b1] text-white flex items-center justify-center rounded-full shrink-0">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[#1d2327] flex items-center gap-2">
                            Módulo de Redação (Editor Principal)
                            <span className="bg-green-100 text-green-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Ativo</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            O novo portal utiliza um sistema de autenticação selada por variáveis de ambiente de alta segurança.
                        </p>
                        
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3 text-sm border-b border-gray-100 pb-3">
                                <Shield className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="font-bold text-gray-700">Nível de Acesso</p>
                                    <p className="text-gray-500">Administrador / Editor Chefe</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm pb-2">
                                <Key className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="font-bold text-gray-700">Como alterar a senha?</p>
                                    <p className="text-gray-500 mt-1">
                                        Para alterar o login e a senha, é necessário acessar o painel da <strong>Vercel</strong> (onde o site está hospedado), navegar até <em>Settings &gt; Environment Variables</em> e alterar as chaves <code>ADMIN_USERNAME</code> e <code>ADMIN_PASSWORD</code>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
