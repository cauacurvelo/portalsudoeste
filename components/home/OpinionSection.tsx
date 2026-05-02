import Image from "next/image"

export function OpinionSection() {
    const columnists = [
        { name: "Carlos Andrade", title: "Política em Foco", avatar: "https://i.pravatar.cc/150?u=carlos" },
        { name: "Juliana Mendes", title: "Cultura e Lazer", avatar: "https://i.pravatar.cc/150?u=juliana" },
        { name: "Roberto Santos", title: "Economia Regional", avatar: "https://i.pravatar.cc/150?u=roberto" }
    ]

    return (
        <section className="w-full py-16 border-t border-gray-100">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl font-serif font-black text-brand-blue-primary whitespace-nowrap">OPINIÃO & COLUNISTAS</h2>
                <div className="h-[2px] w-full bg-gray-100 relative after:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-20 after:bg-brand-red"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {columnists.map((col) => (
                    <div key={col.name} className="group flex items-start gap-4 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue-primary/20 transition-all rounded-sm cursor-pointer">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-gray-light">
                            <Image src={col.avatar} alt={col.name} fill className="object-cover" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">{col.title}</span>
                            <h4 className="font-serif font-black text-lg text-brand-blue-primary group-hover:text-brand-red transition-colors">{col.name}</h4>
                            <p className="text-xs text-gray-500 mt-2 line-clamp-2 italic">"O cenário político da região sudoeste em 2026 e os novos desafios para as prefeituras..."</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
