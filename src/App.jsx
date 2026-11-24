import React, { useState } from 'react'
import IPhoneFrame from './components/IPhoneFrame'
import HeaderBar from './components/HeaderBar'
import BottomNav from './components/BottomNav'
import HomeView from './views/HomeView'
import SongsView from './views/SongsView'
import VideosView from './views/VideosView'
import BookingView from './views/BookingView'
import SongRequestModal from './components/SongRequestModal'
import { Sparkles, Phone, Music, Video, Calendar, ShieldCheck, Globe } from 'lucide-react'

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
    <div className="min-h-screen bg-[#1c1815] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-stone-900 to-black text-slate-100 flex flex-col items-center justify-between p-3 sm:p-6 lg:p-8 font-sans selection:bg-amber-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient Warm Golden Lighting effects */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Showcase Header */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 z-10 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold tracking-wide uppercase">
              Official Mobile App
            </span>
            <span className="text-xs text-amber-200/60 font-medium">bobbydiamond.com</span>
          </div>
          <h1 className="font-serif-cinzel font-black text-xl sm:text-2xl text-amber-50 tracking-wider mt-1">
            BOBBY DIAMOND
          </h1>
          <p className="text-xs text-stone-300 font-medium">
            New England's Dynamic Balladeer &amp; Entertainer • Senior &amp; Gala Booking Experience
          </p>
        </div>

        {/* Quick actions for desktop viewers */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-amber-500/30 text-xs">
          <a
            href="tel:5082854191"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700/80 hover:bg-amber-600 text-white font-bold transition shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 fill-white" />
            <span>508-285-4191</span>
          </a>
          <button
            onClick={() => handleNavigate('booking')}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold border border-amber-500/30 transition cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* Main Presentation Stage: Centered iPhone Mockup */}
      <main className="relative z-10 my-auto flex items-center justify-center w-full">
        <IPhoneFrame activeTab={activeTab} setActiveTab={setActiveTab}>
          {/* Header Bar inside Phone */}
          <HeaderBar />

          {/* Scrollable Screen Content */}
          <div
            id="mobile-scroll-container"
            className="flex-1 overflow-y-auto px-4 py-2 bg-[#FAF7F2] no-scrollbar scroll-smooth"
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

          {/* Floating Pill Navigation Bar */}
          <BottomNav activeTab={activeTab} setActiveTab={handleNavigate} />
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
      <footer className="w-full max-w-4xl text-center text-xs text-stone-400 mt-4 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-stone-800/80 pt-3">
        <div className="flex items-center gap-2 text-stone-400">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>WCAG AAA Compliant High-Contrast Senior Typography &amp; 48px+ Tap Targets</span>
        </div>
        <div className="flex items-center gap-4 text-stone-400">
          <a
            href="https://bobbydiamond.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 transition flex items-center gap-1"
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
