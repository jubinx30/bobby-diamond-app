import React, { useState } from 'react'
import IPhoneFrame from './components/IPhoneFrame'
import HeaderBar from './components/HeaderBar'
import BottomNav from './components/BottomNav'
import HomeView from './views/HomeView'
import SongsView from './views/SongsView'
import VideosView from './views/VideosView'
import BookingView from './views/BookingView'
import SongRequestModal from './components/SongRequestModal'

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
    <div className="min-h-screen bg-white flex items-center justify-center p-0 sm:p-4 md:p-6 font-sans selection:bg-amber-600 selection:text-white">
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
    </div>
  )
}
