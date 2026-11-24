import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Music,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Layers,
  Sparkles
} from 'lucide-react'
import { SONGS_CATALOG, GENRES } from '../data/content'
import { normalizeText } from '../utils/normalizeText'
import { buildSongSearchIndex, matchSong } from '../utils/searchSongs'

const ITEMS_PER_PAGE = 25

export default function SongsView({ onRequestSong, selectedGenre, setSelectedGenre }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchField, setSearchField] = useState('All') // 'All' | 'Title' | 'Artist' | 'Genre'
  const [currentPage, setCurrentPage] = useState(1)

  // 1. Precompute search index once for lightning-fast search
  const indexedSongs = useMemo(() => {
    return SONGS_CATALOG.map((song) => ({
      ...song,
      _searchIndex: buildSongSearchIndex(song)
    }))
  }, [])

  // 2. Filter songs based on genre, search field, and query tokens
  const filteredSongs = useMemo(() => {
    const rawQuery = searchQuery.trim()
    const tokens = rawQuery ? normalizeText(rawQuery).split(' ').filter(Boolean) : []

    return indexedSongs.filter((song) => {
      // Genre filter check
      if (selectedGenre && selectedGenre !== 'All Genres') {
        const songGenreNorm = normalizeText(song.genre)
        const filterGenreNorm = normalizeText(selectedGenre)
        if (!songGenreNorm.includes(filterGenreNorm) && !filterGenreNorm.includes(songGenreNorm)) {
          return false
        }
      }

      // Query tokens check
      if (tokens.length > 0) {
        return matchSong(song, tokens, searchField)
      }

      return true
    })
  }, [indexedSongs, searchQuery, searchField, selectedGenre])

  // Reset to first page when search filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, searchField, selectedGenre])

  // Pagination metrics
  const totalResults = filteredSongs.length
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalResults)
  const paginatedSongs = useMemo(() => {
    return filteredSongs.slice(startIndex, endIndex)
  }, [filteredSongs, startIndex, endIndex])

  const scrollToTop = () => {
    const container = document.getElementById('mobile-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    scrollToTop()
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSearchField('All')
    setSelectedGenre('All Genres')
    setCurrentPage(1)
  }

  // Genre badge color helper
  const getGenreBadgeClass = (genre) => {
    switch (genre) {
      case "60's Songs":
        return 'bg-amber-100/90 text-amber-900 border-amber-300'
      case "70's Music":
        return 'bg-yellow-100 text-yellow-900 border-yellow-300'
      case "80's/90's/& Up":
        return 'bg-purple-100 text-purple-900 border-purple-300'
      case 'Disco Music':
        return 'bg-pink-100 text-pink-900 border-pink-300'
      case 'Motown':
        return 'bg-blue-100 text-blue-900 border-blue-300'
      case 'Country':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300'
      case 'Ballads':
        return 'bg-rose-100 text-rose-900 border-rose-300'
      case 'Blues':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300'
      case 'Italian':
        return 'bg-orange-100 text-orange-900 border-orange-300'
      case 'Cocktail/Bossa':
        return 'bg-amber-50 text-amber-950 border-amber-400'
      default:
        return 'bg-amber-50 text-amber-900 border-amber-200/90'
    }
  }

  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* Header section with count badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block animate-pulse"></span>
            <h2 className="font-bold text-base text-slate-900 tracking-tight">
              Bobby's Repertoire Song Finder
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Search all {SONGS_CATALOG.length.toLocaleString()} songs across Bobby's full live repertoire
          </p>
        </div>

        <div className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold shrink-0 text-right">
          <div>{totalResults.toLocaleString()} Hits</div>
          {totalResults !== SONGS_CATALOG.length && (
            <div className="text-[10px] text-amber-700 font-semibold">of {SONGS_CATALOG.length}</div>
          )}
        </div>
      </div>

      {/* Advanced Search Input Box */}
      <div className="bg-white rounded-3xl p-3.5 border border-amber-200/90 shadow-sm space-y-3">
        {/* Search input with icons */}
        <div className="relative">
          <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by song, artist (e.g. Elvis, Beatles, Sinatra)..."
            className="w-full pl-9 pr-9 py-2.5 text-xs rounded-2xl border border-amber-200/80 bg-amber-50/30 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium placeholder:text-slate-400 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* SEARCH IN field selector */}
        <div className="flex items-center justify-between gap-1 pt-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              SEARCH IN:
            </span>
            {['All', 'Title', 'Artist', 'Genre'].map((field) => (
              <button
                key={field}
                onClick={() => setSearchField(field)}
                className={`text-[11px] px-2 py-0.5 rounded-lg font-semibold transition cursor-pointer ${
                  searchField === field
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 bg-amber-50/80 border border-amber-200/60'
                }`}
              >
                {field}
              </button>
            ))}
          </div>

          {(searchQuery || selectedGenre !== 'All Genres' || searchField !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100/60 transition cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Genre Filter Chips (Horizontal scroll) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Filter By Genre
          </span>
          {selectedGenre !== 'All Genres' && (
            <span className="text-[10px] font-semibold text-amber-800">
              Filtered: {selectedGenre}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {GENRES.map((g) => {
            const isActive = selectedGenre === g
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-amber-200/80 hover:bg-amber-50/70 hover:border-amber-300'
                }`}
              >
                {g}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Range Bar & Quick Stats */}
      {totalResults > 0 && (
        <div className="flex items-center justify-between text-[11px] text-slate-600 px-1 pt-1">
          <div>
            Showing <span className="font-bold text-slate-900">{startIndex + 1}–{endIndex}</span> of{' '}
            <span className="font-bold text-amber-900">{totalResults.toLocaleString()}</span> songs
          </div>
          <div>
            Page <span className="font-bold text-slate-900">{safePage}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>
        </div>
      )}

      {/* Song Catalog List */}
      <div className="space-y-2">
        {totalResults === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-amber-200 space-y-3">
            <Music className="w-9 h-9 text-amber-600/60 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">No songs match your search</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              We couldn't find any song matching "{searchQuery}"
              {selectedGenre !== 'All Genres' ? ` in ${selectedGenre}` : ''}.
              Try searching with another spelling, artist name, or clear the filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs hover:bg-amber-900 transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All {SONGS_CATALOG.length.toLocaleString()} Songs</span>
            </button>
          </div>
        ) : (
          paginatedSongs.map((song) => (
            <div
              key={song.id}
              className="bg-white rounded-2xl p-3.5 border border-amber-200/80 hover:border-amber-400 shadow-xs flex items-center justify-between gap-3 transition group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">#{song.id}</span>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-900 transition truncate">
                    {song.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                  {song.artist}
                </p>

                {/* Medley indicator if applicable */}
                {song.medley && song.medley.length > 0 && (
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-800/90 font-medium bg-amber-50/70 px-2 py-0.5 rounded-md border border-amber-200/50">
                    <Layers className="w-3 h-3 text-amber-700 shrink-0" />
                    <span className="truncate italic">
                      Medley: {song.medley.join(' • ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getGenreBadgeClass(
                    song.genre
                  )}`}
                >
                  {song.genre}
                </span>
                <button
                  onClick={() => onRequestSong(song)}
                  className="text-[11px] font-bold text-amber-900 hover:text-amber-700 flex items-center gap-0.5 cursor-pointer bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-lg transition active:scale-95 shadow-2xs"
                >
                  <span>Request</span>
                  <span className="text-xs">🎵</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl p-3 border border-amber-200/90 shadow-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={safePage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage === 1}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
          </div>

          <div className="text-xs font-bold text-slate-800">
            Page {safePage} of {totalPages}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage === totalPages}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={safePage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
