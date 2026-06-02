"use server"

import { createAdminClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function toggleAdAction(id: string, currentStatus: boolean) {
    const admin = createAdminClient()
    const { error } = await admin
        .from('ads')
        .update({ active: !currentStatus })
        .eq('id', id)
    
    if (error) {
        return { error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/propagandas")
    return { success: true }
}

export async function deleteAdAction(id: string) {
    const admin = createAdminClient()
    const { error } = await admin
        .from('ads')
        .delete()
        .eq('id', id)
    
    if (error) {
        return { error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/propagandas")
    return { success: true }
}

export async function createAdAction(ad: {
    title: string
    link_url: string
    image_url: string
    position: string
    active: boolean
}) {
    const admin = createAdminClient()
    const { data, error } = await admin
        .from('ads')
        .insert([ad])
        .select()
        .single()
    
    if (error) {
        return { error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/propagandas")
    return { success: true, data }
}
