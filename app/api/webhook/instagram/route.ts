import { NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    try {
        // Verify webhook secret
        const authHeader = req.headers.get("x-webhook-secret") || req.headers.get("authorization");
        if (WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // This is a generic webhook receiver.
        // If connecting to Make.com/Zapier, they will send a POST request here
        // with the Instagram post details (e.g., caption, media_url, permalink).

        console.log("📥 Received Instagram Webhook Data:", body);

        // TODO: In a real implementation:
        // 1. Verify a secret token from headers to ensure the request is from a trusted source.
        // 2. Parse `body.media_url` and `body.caption`.
        // 3. Insert the new article into your database (e.g., Supabase/Prisma).
        // 4. Revalidate the Next.js cache for '/' to show the new article immediately.

        return NextResponse.json({ success: true, message: "Webhook processed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing Instagram webhook:", error);
        return NextResponse.json({ success: false, error: "Bad Request" }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Instagram Webhook Endpoint is alive. Use POST to send data." });
}
