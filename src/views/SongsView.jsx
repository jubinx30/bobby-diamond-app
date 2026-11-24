import React, { useState, useMemo } from 'react'
import { Search, Music, Sparkles } from 'lucide-react'
import { SONGS_CATALOG, GENRES } from '../data/content'

export default function SongsView({ onRequestSong, selectedGenre, setSelectedGenre }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchField, setSearchField] = useState('All') // 'All' | 'Title' | 'Artist' | 'Genre'

  const filteredSongs = useMemo(() => {
    return SONGS_CATALOG.filter((song) => {
      // 1. Genre filter
      const matchesGenre =
        selectedGenre === 'All Genres' || song.genre === selectedGenre

      // 2. Query filter
      if (!searchQuery.trim()) return matchesGenre

      const q = searchQuery.toLowerCase().trim()
      let matchesSearch = false

      if (searchField === 'Title') {
        matchesSearch = song.title.toLowerCase().includes(q)
      } else if (searchField === 'Artist') {
        matchesSearch = song.artist.toLowerCase().includes(q)
      } else if (searchField === 'Genre') {
        matchesSearch = song.genre.toLowerCase().includes(q)
      } else {
        // 'All'
        matchesSearch =
          song.title.toLowerCase().includes(q) ||
          song.artist.toLowerCase().includes(q) ||
          song.genre.toLowerCase().includes(q)
      }

      return matchesGenre && matchesSearch
    })
  }, [selectedGenre, searchQuery, searchField])

  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* Header section with count badge */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block animate-pulse"></span>
            <h2 className="font-bold text-base text-slate-900 tracking-tight">
              Repertoire Song Finder
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Search Bobby's complete list of classic hits
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold shrink-0">
          {filteredSongs.length} Songs
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-3 border border-amber-200/90 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search song title, artist, or genre..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl border border-amber-200 bg-[#FAF7F2] text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 text-white font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 transition cursor-pointer shrink-0"
          >
            Search
          </button>
        </div>

        {/* SEARCH IN field selector */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
            SEARCH IN:
          </span>
          <div className="flex items-center gap-1.5">
            {['All', 'Title', 'Artist', 'Genre'].map((field) => (
              <button
                key={field}
                onClick={() => setSearchField(field)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition cursor-pointer ${
                  searchField === field
                    ? 'bg-amber-800 text-white'
                    : 'text-slate-600 hover:text-slate-900 bg-amber-50/70'
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Filter Chips (Horizontal scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {GENRES.map((g) => {
          const isActive = selectedGenre === g
          return (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-amber-200/80 hover:bg-amber-50'
              }`}
            >
              {g}
            </button>
          )
        })}
      </div>

      {/* Song Catalog List */}
      <div className="space-y-2">
        {filteredSongs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-amber-200 space-y-2">
            <Music className="w-8 h-8 text-amber-600/60 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No songs match your search</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or genre filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGenre('All Genres')
              }}
              className="mt-2 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs hover:bg-amber-200 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              className="bg-white rounded-2xl p-3.5 border border-amber-200/80 hover:border-amber-400 shadow-xs flex items-center justify-between gap-3 transition"
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-slate-900 truncate">
                  {song.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                  {song.artist}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                  {song.genre}
                </span>
                <button
                  onClick={() => onRequestSong(song)}
                  className="text-[11px] font-bold text-amber-900 hover:text-amber-700 flex items-center gap-0.5 cursor-pointer bg-amber-50/50 hover:bg-amber-100/70 px-2 py-0.5 rounded-md transition"
                >
                  <span>Request</span>
                  <span>🎵</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
