"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function toggleAdAction(id: string, currentStatus: boolean) {
    const { error } = await supabase
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
    const { error } = await supabase
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

export async function createAdAction(ad: any) {
    const { data, error } = await supabase
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
