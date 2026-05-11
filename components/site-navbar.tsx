'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Story',     path: '/home'      },
  { label: 'Investing', path: '/investing' },
  { label: 'Building',  path: '/building'  },
  { label: 'Advisory',  path: '/advisory'  },
]

export default function SiteNavbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-3 sm:py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => router.push('/')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-black hover:opacity-70 transition-opacity">
          VEX
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          {LINKS.map(l => (
            <button key={l.label} onClick={() => router.push(l.path)}
              className={`text-sm font-medium transition-colors ${pathname === l.path ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black transition-colors">
            <Search size={14} /> Search
          </button>
          <button onClick={() => router.push('/advisory')}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Start a Chat
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
          {LINKS.map(l => (
            <button key={l.label} onClick={() => { router.push(l.path); setOpen(false) }}
              className={`text-sm font-medium text-left px-3 py-3 rounded-lg transition-colors ${pathname === l.path ? 'text-black bg-gray-50' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>
              {l.label}
            </button>
          ))}
          {/* Search + Start a Chat visible on mobile too */}
          <div className="flex gap-2 mt-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:border-black hover:text-black transition-colors">
              <Search size={14} /> Search
            </button>
            <button onClick={() => { router.push('/advisory'); setOpen(false) }}
              className="flex-1 bg-black text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Start a Chat
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
