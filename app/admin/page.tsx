import {
    FileText,
    MessageSquare,
    Pin,
    TrendingUp,
    Eye,
    Plus,
    Clock,
    CheckCircle,
    Edit3,
} from "lucide-react"
import { getLatestArticles, getTotalArticleCount, getPublishedTodayCount, getTopViewsSum } from "@/lib/data/articles-db"
import Link from "next/link"

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
}

function StatCard({ icon: Icon, label, value, href, color }: {
    icon: any; label: string; value: string | number; href: string; color: string
}) {
    return (
        <Link href={href} className="bg-white border border-[#c3c4c7] shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-3xl font-bold text-[#1d2327] leading-none">{value}</p>
                <p className="text-[13px] text-[#646970] mt-1 group-hover:text-[#2271b1] transition-colors">{label}</p>
            </div>
        </Link>
    )
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-[#c3c4c7] shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#c3c4c7] bg-[#f6f7f7]">
                <h3 className="font-semibold text-[14px] text-[#1d2327]">{title}</h3>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}

export default async function AdminDashboard() {
    const [totalArticles, recentArticles, todayCount, topViews] = await Promise.all([
        getTotalArticleCount(),
        getLatestArticles(6),
        getPublishedTodayCount(),
        getTopViewsSum(),
    ])

    return (
        <div className="space-y-6">

            {/* Page Title */}
            <div className="flex items-center justify-between">
                <h1 className="text-[23px] text-[#1d2327] font-normal">Painel</h1>
                <Link
                    href="/admin/noticias/nova"
                    className="flex items-center gap-2 bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 text-[13px] rounded-sm transition-colors"
                >
                    <Plus className="w-4 h-4" /> Novo Post
                </Link>
            </div>

            {/* Welcome Banner */}
            <div className="bg-white border border-[#c3c4c7] shadow-sm p-6 border-l-4 border-l-[#2271b1]">
                <h2 className="text-[18px] font-semibold text-[#1d2327] mb-1">
                    Bem-vindo ao Painel do Portal do Sudoeste! 👋
                </h2>
                <p className="text-[#646970] text-[13px] mb-4">
                    18 Anos no Ar! O Portal de Notícias do Sudoeste da Bahia.
                </p>
                <div className="flex flex-wrap gap-3 text-[13px]">
                    <Link href="/admin/noticias/nova" className="bg-[#2271b1] text-white px-3 py-1.5 hover:bg-[#135e96] transition-colors rounded-sm">
                        Escrever novo post
                    </Link>
                    <Link href="/" target="_blank" className="text-[#2271b1] hover:underline flex items-center gap-1">
                        <Eye className="w-4 h-4" /> Ver o site
                    </Link>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Pin}
                    label="Posts publicados"
                    value={totalArticles}
                    href="/admin/noticias"
                    color="bg-[#2271b1]"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Publicados hoje"
                    value={todayCount}
                    href="/admin/noticias"
                    color="bg-[#00a32a]"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Comentários"
                    value="0"
                    href="/admin/comentarios"
                    color="bg-[#d63638]"
                />
                <StatCard
                    icon={Eye}
                    label="Visitas (Top 100)"
                    value={formatNumber(topViews)}
                    href="/admin/noticias"
                    color="bg-[#996800]"
                />
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

                {/* Activity - wider */}
                <div className="lg:col-span-3 space-y-4">
                    <Widget title="Atividade Recente">
                        <div className="space-y-1">
                            {recentArticles.map((article) => (
                                <div key={article.id} className="flex items-start gap-3 py-2.5 border-b border-[#f0f0f1] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-[#00a32a]/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-3 h-3 text-[#00a32a]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/admin/noticias/${article.slug}`}
                                            className="text-[#2271b1] hover:underline text-[13px] font-medium line-clamp-1 block"
                                        >
                                            {article.title}
                                        </Link>
                                        <p className="text-[11px] text-[#a7aaad] mt-0.5">
                                            {new Date(article.date).toLocaleDateString('pt-BR', {
                                                day: '2-digit', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })} · {article.category}
                                        </p>
                                    </div>
                                    <Link href={`/admin/noticias/${article.slug}`} className="text-[#a7aaad] hover:text-[#2271b1] transition-colors shrink-0">
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <Link href="/admin/noticias" className="inline-block mt-3 text-[#2271b1] hover:underline text-[13px]">
                            Ver todos os posts →
                        </Link>
                    </Widget>
                </div>

                {/* Right column */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Quick Draft */}
                    <Widget title="Rascunho Rápido">
                        <form className="space-y-3">
                            <input
                                type="text"
                                placeholder="Título do post"
                                className="w-full border border-[#8c8f94] px-3 py-2 text-[13px] focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20 outline-none rounded-sm bg-[#fafafa]"
                            />
                            <textarea
                                placeholder="No que você está pensando?"
                                rows={4}
                                className="w-full border border-[#8c8f94] px-3 py-2 text-[13px] focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20 outline-none resize-none rounded-sm bg-[#fafafa]"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="bg-[#2271b1] text-white px-4 py-1.5 text-[13px] rounded-sm hover:bg-[#135e96] transition-colors"
                                >
                                    Salvar rascunho
                                </button>
                            </div>
                        </form>
                    </Widget>

                    {/* Em Relance */}
                    <Widget title="Em um Relance">
                        <div className="space-y-2 text-[13px]">
                            <Link href="/admin/noticias" className="flex items-center justify-between text-[#2271b1] hover:underline py-1">
                                <span className="flex items-center gap-2">
                                    <Pin className="w-4 h-4 text-[#a7aaad]" /> Posts
                                </span>
                                <span className="font-semibold text-[#1d2327]">{totalArticles}</span>
                            </Link>
                            <Link href="/admin/paginas" className="flex items-center justify-between text-[#2271b1] hover:underline py-1">
                                <span className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#a7aaad]" /> Páginas
                                </span>
                                <span className="font-semibold text-[#1d2327]">6</span>
                            </Link>
                            <Link href="/admin/comentarios" className="flex items-center justify-between text-[#2271b1] hover:underline py-1">
                                <span className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-[#a7aaad]" /> Comentários
                                </span>
                                <span className="font-semibold text-[#1d2327]">0</span>
                            </Link>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#f0f0f1] text-[12px] text-[#646970]">
                            Tema ativo: <span className="text-[#2271b1] font-medium">PortalSudoeste</span>
                        </div>
                    </Widget>
                </div>
            </div>
        </div>
    )
}
