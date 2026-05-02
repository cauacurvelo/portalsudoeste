import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sobre | Portal do Sudoeste",
    description: "Conheça a história do Portal do Sudoeste, o maior portal de notícias do sudoeste baiano.",
}

export default function SobrePage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-blue-primary uppercase tracking-tighter italic">O Portal</h1>
                    <div className="w-24 h-1 bg-brand-red mx-auto" />
                    <p className="text-xl text-gray-500 font-medium">Liderança em informação e credibilidade no sudoeste baiano.</p>
                </header>

                <section className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
                    <p className="text-2xl font-serif text-brand-blue-primary font-bold border-l-4 border-brand-red pl-6 italic">
                        O Portal do Sudoeste (antigo Portal Poções) nasceu com o compromisso de levar a notícia real, com rapidez e imparcialidade, para toda a nossa região.
                    </p>
                    <p>
                        Com sede em Poções, Bahia, consolidamos nossa presença como o principal canal de notícias da microrregião, abrangendo municípios como Jequié, Vitória da Conquista, Planalto, Caatiba, Iguaí, Boa Nova e todo o entorno.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                        <div className="bg-brand-gray-light p-8 rounded-sm">
                            <h3 className="font-serif font-black text-xl text-brand-blue-primary mb-4 italic">Missão</h3>
                            <p className="text-sm">Informar com precisão e responsabilidade, contribuindo para o desenvolvimento social e democrático da região Sudoeste.</p>
                        </div>
                        <div className="bg-brand-blue-primary text-white p-8 rounded-sm shadow-xl">
                            <h3 className="font-serif font-black text-xl mb-4 italic text-brand-red">Visão</h3>
                            <p className="text-sm opacity-80">Ser a plataforma digital de maior alcance e influência na Bahia, inovando constantemente na forma de contar histórias.</p>
                        </div>
                    </div>
                    <p>
                        Nossa equipe é formada por profissionais apaixonados pela notícia, que trabalham 24 horas por dia para garantir que você esteja sempre "em cima da hora" com os fatos que mudam o mundo.
                    </p>
                </section>

                <footer className="pt-12 border-t border-gray-100 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">© 2026 Portal do Sudoeste</p>
                </footer>
            </div>
        </div>
    )
}
