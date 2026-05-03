// Server Component — busca últimas notícias e passa para o ticker
import { getLatestArticles } from "@/lib/data/articles-db"
import { NewsTickerClient } from "./NewsTickerClient"

export async function NewsTicker() {
    const articles = await getLatestArticles(10)
    return <NewsTickerClient articles={articles} />
}
