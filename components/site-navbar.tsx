'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search, User, Menu, X } from 'lucide-react'

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
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-2xl font-bold tracking-tight text-black hover:opacity-70 transition-opacity">VEX</button>

        <div className="hidden md:flex gap-8">
          {LINKS.map(l => (
            <button key={l.label} onClick={() => router.push(l.path)}
              className={`text-sm font-medium transition-colors ${pathname === l.path ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black transition-colors">
            <Search size={14} /> Search
          </button>
          <button className="hidden md:flex w-9 h-9 rounded-full border border-gray-200 items-center justify-center text-gray-600 hover:border-black transition-colors">
            <User size={15} />
          </button>
          <button onClick={() => router.push('/advisory')} className="hidden md:block bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Start a Chat
          </button>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {LINKS.map(l => (
            <button key={l.label} onClick={() => { router.push(l.path); setOpen(false) }}
              className={`text-sm font-medium text-left py-1 transition-colors ${pathname === l.path ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => router.push('/advisory')} className="mt-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium w-full">Start a Chat</button>
        </div>
      )}
    </nav>
  )
}
