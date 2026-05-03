// Server Component wrapper — busca dados e passa para o client carousel
import { getFeaturedArticles } from "@/lib/data/articles-db"
import { HeroCarouselClient } from "./HeroCarouselClient"

export async function HeroCarousel() {
    const articles = await getFeaturedArticles(5)
    return <HeroCarouselClient articles={articles} />
}
