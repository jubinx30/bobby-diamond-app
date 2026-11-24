import React from 'react'
import { Home, Search, PlayCircle, PhoneCall } from 'lucide-react'

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'songs', label: 'Songs', icon: Search },
    { id: 'videos', label: 'Videos', icon: PlayCircle },
    { id: 'booking', label: 'Booking', icon: PhoneCall },
  ]

  return (
    <nav 
      aria-label="Main Navigation"
      className="absolute bottom-3.5 left-0 right-0 z-30 px-3 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center justify-between w-full max-w-[360px] bg-white/95 backdrop-blur-md border border-amber-300/80 shadow-lg px-2 py-1.5 rounded-full transition-all">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                // Scroll top smoothly inside the mobile scroll container
                const container = document.getElementById('mobile-scroll-container')
                if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-amber-100 text-amber-950 border border-amber-400/80 shadow-xs scale-[1.02]'
                  : 'text-slate-700 hover:text-amber-900 hover:bg-amber-50/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-800' : 'text-slate-600'}`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
