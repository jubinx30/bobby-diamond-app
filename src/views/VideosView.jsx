import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, ExternalLink } from 'lucide-react'
import { VIDEOS_DATA } from '../data/content'

export default function VideosView() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS_DATA[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(28)

  const handleSelectVideo = (video) => {
    setSelectedVideo(video)
    setIsPlaying(true)
    setProgress(0)
    const topEl = document.getElementById('video-player-container')
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block animate-pulse"></span>
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            Live Concert Videos
          </h2>
        </div>
        <p className="text-xs text-slate-600 mt-0.5">
          Official concert clips &amp; performances
        </p>
      </div>

      {/* Featured Video Player Card */}
      <section
        id="video-player-container"
        className="bg-white rounded-3xl border border-amber-200/90 shadow-sm overflow-hidden"
      >
        {/* Video Canvas / Player */}
        <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group">
          {/* Background stage simulation */}
          <div className="absolute inset-0 opacity-40 bg-radial from-amber-600/30 via-slate-950 to-slate-950"></div>
          
          <img
            src="/bobby-diamond.jpg"
            alt={selectedVideo.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-70 scale-105' : 'opacity-40'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Center Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="absolute z-10 w-14 h-14 rounded-full bg-amber-600/90 hover:bg-amber-500 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/80"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </button>

          {/* Playing indicator / audio bars */}
          {isPlaying && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 flex items-center gap-1.5 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>PLAYING LIVE CLIP</span>
            </div>
          )}

          {/* Video bottom control bar */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent text-white text-[11px] flex flex-col gap-1.5">
            {/* Progress bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const clickX = e.clientX - rect.left
                const newProgress = Math.round((clickX / rect.width) * 100)
                setProgress(newProgress)
              }}
              className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                style={{ width: `${isPlaying ? Math.max(progress, 15) : progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/80 px-0.5">
              <span>{isPlaying ? '01:24' : '00:00'} / {selectedVideo.duration}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-amber-300 transition"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <span className="font-semibold text-amber-300">HD 1080p</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata */}
        <div className="p-4 space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold tracking-wide uppercase">
            {selectedVideo.tag || 'FEATURED CLIP'}
          </span>
          <h3 className="font-serif-cinzel font-bold text-slate-900 text-base leading-snug">
            {selectedVideo.title}
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {selectedVideo.subtitle}
          </p>
        </div>
      </section>

      {/* More Live Clips List */}
      <div>
        <h3 className="font-bold text-xs text-slate-900 tracking-wider uppercase mb-2 px-1">
          MORE LIVE CLIPS
        </h3>

        <div className="space-y-2.5">
          {VIDEOS_DATA.map((clip) => {
            const isSelected = selectedVideo.id === clip.id
            return (
              <div
                key={clip.id}
                className={`bg-white rounded-2xl p-3 border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                    : 'border-amber-200/80 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    onClick={() => handleSelectVideo(clip)}
                    className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Play className="w-4 h-4 fill-rose-600 text-rose-600 ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {clip.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                      {clip.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectVideo(clip)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-800 text-white'
                      : 'border border-amber-300 bg-amber-50/70 text-amber-950 hover:bg-amber-100'
                  }`}
                >
                  <span>{isSelected ? 'Playing' : 'Watch'}</span>
                  <span>↗</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
