import React from 'react'
import { Calendar, Music, Phone, Mail, Play, Star, ChevronRight } from 'lucide-react'
import { REPERTOIRE_CATEGORIES, SONGS_CATALOG } from '../data/content'

export default function HomeView({ onNavigate, onSelectGenre }) {
  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* 1. Hero Profile Card */}
      <section className="bg-white rounded-3xl border border-amber-200/90 shadow-sm overflow-hidden relative">
        <div className="h-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800" />
        
        <div className="p-5 text-center flex flex-col items-center">
          {/* Framed portrait circle with gold border & LIVE badge */}
          <div className="relative mb-3">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-700 shadow-md">
              <img
                src="/bobby-diamond.jpg"
                alt="Bobby Diamond holding microphone live on stage"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 right-2 bg-gradient-to-r from-amber-800 to-amber-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
              <span>LIVE</span>
            </div>
          </div>

          <h2 className="font-serif-cinzel font-black text-2xl tracking-wider text-slate-900 mb-1">
            BOBBY DIAMOND
          </h2>
          <p className="font-semibold text-amber-900 text-xs sm:text-sm tracking-tight mb-2.5">
            New England's Dynamic Balladeer &amp; Entertainer
          </p>

          <p className="text-xs text-slate-700 leading-relaxed max-w-xs mb-5 font-normal">
            Captivating "Standing Room Only" audiences across theatres, showrooms, corporate conventions &amp; private galas.
          </p>

          {/* Dual Action CTA Buttons (generous 48px+ tap targets) */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <button
              onClick={() => onNavigate('booking')}
              className="flex items-center justify-center gap-2 h-12 px-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition cursor-pointer border border-amber-600/30"
            >
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Book Bobby</span>
            </button>

            <button
              onClick={() => onNavigate('songs')}
              className="flex items-center justify-center gap-2 h-12 px-3 rounded-2xl bg-white border border-amber-500/90 text-amber-950 font-bold text-xs shadow-xs hover:bg-amber-50 active:scale-[0.98] transition cursor-pointer"
            >
              <Music className="w-4 h-4 text-amber-700" />
              <span>Repertoire</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Direct Senior-Friendly Booking Widget */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/90 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/80">
            <Phone className="w-5 h-5 fill-amber-700 text-amber-800" />
          </div>
          <div>
            <span className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              DIRECT BOOKING
            </span>
            <a
              href="tel:5082854191"
              className="text-xl font-bold text-gray-900 hover:text-amber-800 transition tracking-tight block"
            >
              508-285-4191
            </a>
          </div>
        </div>

        <a
          href="mailto:bobby@bobbydiamond.com"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-amber-500/80 bg-amber-50/60 hover:bg-amber-100/90 text-amber-950 font-bold text-xs transition cursor-pointer shrink-0"
        >
          <span>Email</span>
          <Mail className="w-3.5 h-3.5 text-amber-800" />
        </a>
      </section>

      {/* 3. Repertoire Highlights Grid */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">
            Repertoire Highlights
          </h3>
          <button
            onClick={() => onNavigate('songs')}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All {SONGS_CATALOG.length.toLocaleString()} Songs</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {REPERTOIRE_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectGenre(cat.genreFilter)
                onNavigate('songs')
              }}
              className="text-left p-3 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-amber-400 hover:bg-white transition cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <h4 className="font-bold text-xs text-slate-900 group-hover:text-amber-800 transition">
                {cat.title}
              </h4>
              <p className="text-[11px] text-amber-800 mt-1 font-medium leading-tight">
                {cat.artists}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Live Performance Clips Promo Card */}
      <section
        onClick={() => onNavigate('videos')}
        className="bg-white rounded-3xl p-4 border border-amber-300 shadow-sm flex items-center gap-3.5 cursor-pointer hover:bg-amber-50/40 transition group"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 group-hover:scale-105 transition-transform">
          <Play className="w-5 h-5 fill-rose-600 text-rose-600 ml-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-xs text-slate-900 group-hover:text-amber-900 transition">
            Live Performance Clips
          </h4>
          <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
            Watch concert footage: Hello Dolly, Vehicle &amp; Ballads ▶
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition shrink-0" />
      </section>

      {/* 5. Testimonial Quote Card */}
      <section className="bg-white rounded-3xl p-4 border border-amber-300 shadow-sm relative overflow-hidden">
        <div className="absolute top-1 left-3 text-4xl font-serif text-amber-200 select-none">“</div>
        <blockquote className="relative z-10 pt-2">
          <p className="text-xs text-slate-800 font-medium italic leading-relaxed">
            "Bobby will absolutely leave you standing on your feet! From the moment he walks on stage, everyone senses the magic about to happen."
          </p>
          <footer className="text-right text-[11px] font-bold text-amber-900 mt-2">
            — Ross Martin, Syndicated Columnist
          </footer>
        </blockquote>
      </section>
    </div>
  )
}
