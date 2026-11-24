import React from 'react'
import { Phone } from 'lucide-react'

export default function HeaderBar() {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md px-4 py-2.5 border-b border-amber-200/70 flex items-center justify-between">
      <div className="flex items-center space-x-2.5">
        <div className="relative">
          <img
            src="/bobby-diamond.jpg"
            alt="Bobby Diamond"
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-600/60 shadow-sm"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h1 className="font-serif-cinzel text-sm font-black tracking-wider text-slate-900 leading-none">
            BOBBY DIAMOND
          </h1>
          <p className="text-[11px] font-medium text-amber-900/80 tracking-tight mt-0.5">
            Dynamic Balladeer &amp; Entertainer
          </p>
        </div>
      </div>

      <a
        href="tel:5082854191"
        aria-label="Call Bobby Diamond at 508-285-4191"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white font-semibold text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all duration-150 border border-amber-600/40"
      >
        <Phone className="w-3.5 h-3.5 fill-white text-white" />
        <span>Call</span>
      </a>
    </header>
  )
}
