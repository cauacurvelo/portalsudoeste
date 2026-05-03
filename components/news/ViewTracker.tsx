"use client"

import { useEffect, useRef } from "react"
import { trackArticleView } from "@/app/actions"

export function ViewTracker({ articleId }: { articleId: string }) {
    const tracked = useRef(false)

    useEffect(() => {
        if (!tracked.current) {
            tracked.current = true
            trackArticleView(articleId)
        }
    }, [articleId])

    return null
}
