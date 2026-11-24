import React, { useState } from 'react'
import { Music, X, Check, Calendar, User, Phone, Mail } from 'lucide-react'

export default function SongRequestModal({ song, onClose, onBookingPrefill }) {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')

  if (!song) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white rounded-3xl p-5 border border-amber-300 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 bg-amber-50 hover:bg-amber-100 p-1.5 rounded-full transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-serif-cinzel font-bold text-lg text-slate-900">Request Sent to Bobby!</h3>
            <p className="text-sm text-slate-600 px-2">
              We've noted <span className="font-semibold text-amber-800">"{song.title}"</span> for Bobby's setlist inquiry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wider text-amber-700 uppercase">Request Song for Your Event</p>
                <h3 className="font-serif-cinzel font-bold text-slate-900 text-base leading-tight">
                  {song.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium">{song.artist}</p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary Sullivan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 508-555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Event Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 50th Wedding Anniversary gala"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30 text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-[0.98] transition"
              >
                Submit Song Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
