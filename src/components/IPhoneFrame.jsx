import React from 'react'
import { Wifi } from 'lucide-react'

export default function IPhoneFrame({ children, activeTab, setActiveTab }) {
  return (
    <div className="relative w-full max-w-[400px] min-h-[820px] h-[844px] max-h-[94vh] rounded-[44px] border-[8px] border-slate-900 shadow-2xl overflow-hidden flex flex-col bg-[#FAF7F2] ring-1 ring-slate-800/80">
      {/* Outer hardware buttons */}
      <div className="absolute -left-[10px] top-[110px] w-[3px] h-[26px] bg-slate-700 rounded-l-sm pointer-events-none" />
      <div className="absolute -left-[10px] top-[155px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm pointer-events-none" />
      <div className="absolute -left-[10px] top-[215px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm pointer-events-none" />
      <div className="absolute -right-[10px] top-[165px] w-[3px] h-[64px] bg-slate-700 rounded-r-sm pointer-events-none" />

      {/* Screen Container */}
      <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#FAF7F2]">
        {/* iOS Status Bar */}
        <div className="relative z-40 h-10 px-6 pt-2 flex items-center justify-between text-slate-900 select-none shrink-0 bg-[#FAF7F2]/95 backdrop-blur-xs">
          {/* Time */}
          <span className="text-[13px] font-bold tracking-tight text-slate-900 pl-1">
            9:41
          </span>

          {/* Dynamic Island Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[114px] h-[26px] bg-black rounded-full flex items-center justify-end px-2.5 shadow-sm">
            {/* Front Camera lens dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800/80 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-indigo-950/80" />
            </div>
          </div>

          {/* Right Status Icons: 5G & Battery */}
          <div className="flex items-center gap-1.5 pr-1">
            <span className="text-[11px] font-extrabold text-slate-800 tracking-tight">
              5G
            </span>
            {/* iOS Battery icon */}
            <div className="flex items-center">
              <div className="w-5 h-2.5 rounded-[4px] border border-slate-800 p-0.5 flex items-center">
                <div className="w-full h-full bg-slate-900 rounded-[2px]" />
              </div>
              <div className="w-[1.5px] h-1 bg-slate-800 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Children / Content */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1 left-0 right-0 z-40 pointer-events-none flex justify-center pb-0.5">
          <div className="w-32 h-1 bg-slate-900/60 rounded-full" />
        </div>
      </div>
    </div>
  )
}
