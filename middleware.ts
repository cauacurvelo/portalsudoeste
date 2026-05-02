import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Protect admin routes (except login)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const authToken = request.cookies.get("admin-auth")?.value

        if (authToken !== "authenticated") {
            const loginUrl = new URL("/admin/login", request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}
