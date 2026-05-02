import React from 'react'

interface AdSpaceProps {
  label?: string
  width?: string | number
  height?: string | number
  className?: string
}

export function AdSpace({ label = "Espaço Publicitário", width, height, className = "" }: AdSpaceProps) {
  return (
    <div 
      className={`w-full bg-[#f8f9fa] border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:shadow-inner ${className}`}
      style={{ minHeight: height || '120px' }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-[1px] w-4 bg-gray-300"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">{label}</span>
          <div className="h-[1px] w-4 bg-gray-300"></div>
        </div>
        
        {width && height && (
          <div className="px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm">
            <span className="text-[9px] font-bold text-brand-blue-primary/60 uppercase tracking-widest">{width} x {height}</span>
          </div>
        )}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-200"></div>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gray-200"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gray-200"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-200"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-brand-blue-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}
