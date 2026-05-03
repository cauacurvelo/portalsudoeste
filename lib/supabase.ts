import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (for front-end reads)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client (for migrations and writes)
export function createAdminClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false }
    })
}
