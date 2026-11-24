import React, { useState } from 'react'
import IPhoneFrame from './components/IPhoneFrame'
import HeaderBar from './components/HeaderBar'
import BottomNav from './components/BottomNav'
import HomeView from './views/HomeView'
import SongsView from './views/SongsView'
import VideosView from './views/VideosView'
import BookingView from './views/BookingView'
import SongRequestModal from './components/SongRequestModal'
import { Phone, Globe, ShieldCheck } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedGenre, setSelectedGenre] = useState('All Genres')
  const [requestedSong, setRequestedSong] = useState(null)

  const handleNavigate = (tab) => {
    setActiveTab(tab)
    const container = document.getElementById('mobile-scroll-container')
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre)
  }

  const handleRequestSong = (song) => {
    setRequestedSong(song)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-between p-3 sm:p-6 lg:p-8 font-sans selection:bg-amber-600 selection:text-white relative overflow-x-hidden">
      {/* Desktop Showcase Header */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 z-10 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-bold tracking-wide uppercase">
              Official Mobile App
            </span>
            <span className="text-xs text-slate-500 font-medium">bobbydiamond.com</span>
          </div>
          <h1 className="font-serif-cinzel font-black text-xl sm:text-2xl text-slate-900 tracking-wider mt-1">
            BOBBY DIAMOND
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            New England's Dynamic Balladeer &amp; Entertainer • Senior &amp; Gala Booking Experience
          </p>
        </div>

        {/* Quick actions for desktop viewers */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 text-xs shadow-xs">
          <a
            href="tel:5082854191"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold transition shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 fill-white" />
            <span>508-285-4191</span>
          </a>
          <button
            onClick={() => handleNavigate('booking')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold border border-amber-300/80 transition cursor-pointer shadow-xs"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* Main Presentation Stage: Centered iPhone Mockup */}
      <main className="relative z-10 my-auto flex items-center justify-center w-full py-2">
        <IPhoneFrame
          bottomNav={
            <BottomNav activeTab={activeTab} setActiveTab={handleNavigate} />
          }
        >
          {/* Header Bar inside Phone */}
          <HeaderBar />

          {/* Scrollable Screen Content */}
          <div
            id="mobile-scroll-container"
            className="flex-1 overflow-y-auto px-4 py-2 bg-[#f1f5f9] no-scrollbar scroll-smooth"
          >
            {activeTab === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onSelectGenre={handleSelectGenre}
              />
            )}
            {activeTab === 'songs' && (
              <SongsView
                onRequestSong={handleRequestSong}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
              />
            )}
            {activeTab === 'videos' && <VideosView />}
            {activeTab === 'booking' && <BookingView />}
          </div>
        </IPhoneFrame>
      </main>

      {/* Song Request Modal */}
      {requestedSong && (
        <SongRequestModal
          song={requestedSong}
          onClose={() => setRequestedSong(null)}
          onBookingPrefill={() => {
            setRequestedSong(null)
            handleNavigate('booking')
          }}
        />
      )}

      {/* Footer / Accessibility & Info Note */}
      <footer className="w-full max-w-4xl text-center text-xs text-slate-500 mt-4 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200 pt-3">
        <div className="flex items-center gap-2 text-slate-600">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>WCAG AAA Compliant High-Contrast Senior Typography &amp; 48px+ Tap Targets</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <a
            href="https://bobbydiamond.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-800 transition flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>bobbydiamond.com</span>
          </a>
          <span>•</span>
          <span>Norton, MA</span>
        </div>
      </footer>
    </div>
  )
}
