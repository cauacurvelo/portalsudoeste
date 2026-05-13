import Image from 'next/image'
import Link from 'next/link'
import { getActiveAds } from '@/lib/data/ads-db'

interface AdSpaceProps {
  label?: string
  width?: string | number
  height?: string | number
  className?: string
  position?: string // 'topo', 'sidebar', 'meio'
}

export async function AdSpace({ label = "Espaço Publicitário", width, height, className = "", position = "topo" }: AdSpaceProps) {
  const ads = await getActiveAds()
  const currentAd = ads.find(ad => ad.position === position)

  // Se não tem propaganda para essa posição, não mostra nada
  if (!currentAd) return null

  const AdContent = (
    <div 
      className={`w-full relative overflow-hidden group transition-all ${className}`}
      style={{ minHeight: height || 'auto' }}
    >
      <div className="flex flex-col items-center">
        {/* Ad Image */}
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <img 
            src={currentAd.image_url} 
            alt={currentAd.title} 
            className="w-full object-contain max-h-[250px]"
          />
        </div>
        
        {/* Label (Optional) */}
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2 mb-2">{label}</span>
      </div>
    </div>
  )

  return currentAd.link_url ? (
    <a href={currentAd.link_url} target="_blank" rel="noopener noreferrer" className="block w-full">
      {AdContent}
    </a>
  ) : (
    AdContent
  )
}
