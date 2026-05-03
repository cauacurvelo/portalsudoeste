"use server"

import { incrementViews } from "@/lib/data/articles-db"

export async function trackArticleView(articleId: string) {
    try {
        await incrementViews(articleId)
    } catch (error) {
        console.error("Failed to increment views:", error)
    }
}
