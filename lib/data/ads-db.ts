import { supabase } from '@/lib/supabase'
import { cache } from 'react'

export interface Ad {
    id: string
    title: string
    image_url: string
    link_url: string
    position: string // 'topo', 'sidebar', 'meio'
    active: boolean
    created_at: string
}

export const getActiveAds = cache(async (): Promise<Ad[]> => {
    try {
        const { data, error } = await supabase
            .from('ads')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false })

        if (error) {
            console.error("Erro ao buscar ads:", error)
            return []
        }
        return data as Ad[]
    } catch (e) {
        return []
    }
})

export const getAllAds = async (): Promise<Ad[]> => {
    try {
        const { data, error } = await supabase
            .from('ads')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error("Erro ao buscar todos ads:", error)
            return []
        }
        return data as Ad[]
    } catch (e) {
        return []
    }
}

export async function createAd(ad: Omit<Ad, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('ads')
        .insert([ad])
        .select()
        .single()
    
    if (error) throw error
    return data
}

export async function deleteAd(id: string) {
    const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id)
    
    if (error) throw error
}

export async function toggleAdStatus(id: string, currentStatus: boolean) {
    const { error } = await supabase
        .from('ads')
        .update({ active: !currentStatus })
        .eq('id', id)
    
    if (error) throw error
}
