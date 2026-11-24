import React, { useState } from 'react'
import { Phone, Mail, Calendar, CheckCircle2, Send, MapPin, Building2, Clock, Sparkles } from 'lucide-react'

export default function BookingView() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: 'Corporate Galas & Conventions',
    venue: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      // Keep confirmation visible or scroll to it
    }, 500)
  }

  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block animate-pulse"></span>
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            Direct Booking &amp; Contact
          </h2>
        </div>
        <p className="text-xs text-slate-600 mt-0.5">
          Book Bobby Diamond directly for your event
        </p>
      </div>

      {/* Main Contact Card (Direct layout from Screenshot 4) */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/90 shadow-sm space-y-3.5">
        {/* Telephone Block */}
        <a
          href="tel:5082854191"
          className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-800 to-amber-950 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Phone className="w-5 h-5 fill-white" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
              TELEPHONE
            </span>
            <span className="text-lg font-black text-slate-900 tracking-tight block">
              508-285-4191
            </span>
          </div>
        </a>

        {/* Direct Email Block */}
        <a
          href="mailto:bobby@bobbydiamond.com"
          className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-800 to-amber-950 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
              DIRECT EMAIL
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate block">
              bobby@bobbydiamond.com
            </span>
          </div>
        </a>

        {/* Divider */}
        <div className="border-t border-amber-200/70 pt-3">
          <h4 className="font-bold text-xs text-slate-900 mb-2">
            Event Types Bobby Performs:
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              <span>Theatres &amp; Major Concert Showrooms</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              <span>Corporate Galas &amp; Conventions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              <span>Private Concerts &amp; Celebrations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              <span>Senior Living Communities &amp; Country Clubs</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Date Availability & Quote Request Form */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-800" />
          <h3 className="font-bold text-xs text-slate-900 tracking-tight uppercase">
            Check Date Availability &amp; Request Quote
          </h3>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif-cinzel font-bold text-sm text-slate-900">
              Inquiry Submitted!
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Thank you, <span className="font-semibold">{formData.name || 'Friend'}</span>! Bobby Diamond's team will contact you directly within 24 hours regarding date availability.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  eventDate: '',
                  eventType: 'Corporate Galas & Conventions',
                  venue: '',
                  notes: ''
                })
              }}
              className="mt-2 text-xs font-bold text-amber-900 underline cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Your Name / Organization <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance / Boston Gala Committee"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Phone <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="508-555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Target Event Date
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium transition"
                >
                  <option>Theatres &amp; Major Concert Showrooms</option>
                  <option>Corporate Galas &amp; Conventions</option>
                  <option>Private Concerts &amp; Celebrations</option>
                  <option>Senior Living Community Concert</option>
                  <option>Country Club / Anniversary</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Venue Location (City, State)
              </label>
              <input
                type="text"
                placeholder="e.g. Providence, RI or Boston, MA"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium transition"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Event Details &amp; Notes
              </label>
              <textarea
                rows={2}
                placeholder="Describe your event, expected guest count, or favorite songs..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium resize-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-amber-200" />
              <span>Submit Booking Inquiry</span>
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
