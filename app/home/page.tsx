'use client'

import { ArrowRight, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SiteNavbar from '@/components/site-navbar'

export default function HomePage() {
  const router  = useRouter()
  const [fade, setFade] = useState(false)
  const locked  = useRef(false)
  const touchY  = useRef(0)

  // ── scroll up at the very top → go back to landing ────────────
  const goLanding = () => {
    if (locked.current) return
    locked.current = true
    setFade(true)
    setTimeout(() => router.push('/'), 320)
  }

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < -20) goLanding()
    }
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY }
    const onEnd   = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientY - touchY.current
      if (window.scrollY === 0 && diff > 40) goLanding()
    }
    window.addEventListener('wheel',      onWheel, { passive: true })
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [])

  return (
    <div className="min-h-screen font-sans text-white relative" style={{
      animation: 'pageFadeIn 0.4s ease forwards',
    }}>
      <style>{`@keyframes pageFadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Black fade overlay */}
      <div className="fixed inset-0 z-[100] bg-black pointer-events-none"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.6s ease' }} />

      {/* ══ CINEMATIC VIDEO BACKGROUND — full page, fixed ══ */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4" type="video/mp4" />
        </video>
        {/* Bottom blur fade — blur only, no dark gradient */}
        <div className="absolute inset-0" style={{
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }} />
      </div>

      {/* ══ CONTENT — sits above the video ══ */}
      <div className="relative z-10">
        <SiteNavbar />

        {/* Story section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                <BookOpen size={14} /> Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 sm:mb-6">
                Built on conviction.<br />Driven by purpose.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                Founded in 2002, VEX began as a small advisory boutique with a single belief: that the best investments are made at the intersection of deep insight and bold action. Over two decades, we have grown into a global platform spanning venture capital, real estate development, and strategic consulting.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Our team of 200+ professionals operates across New York, London, Dubai, and Singapore — united by a shared commitment to creating lasting value for our partners, portfolio companies, and communities.
              </p>
              <button onClick={() => router.push('/investing')}
                className="inline-flex items-center gap-2 bg-white text-black px-6 sm:px-7 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                See what we invest in <ArrowRight size={16} />
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-5 sm:space-y-6 mt-8 lg:mt-0">
              {[
                { year: '2002', title: 'Founded in New York',   desc: 'Started as a boutique M&A advisory firm with 5 partners.' },
                { year: '2008', title: 'Launched VEX Capital',  desc: 'Expanded into direct investing through our first $200M fund.' },
                { year: '2014', title: 'Global Expansion',      desc: 'Opened offices in London and Dubai, entering EMEA markets.' },
                { year: '2020', title: 'VEX Build Division',    desc: 'Launched our real estate development arm across 3 continents.' },
                { year: '2024', title: '$4B+ AUM Milestone',    desc: 'Crossed $4 billion in assets under management.' },
              ].map((item, i, arr) => (
                <div key={i} className="flex gap-5 sm:gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-white mt-1.5 group-hover:bg-gray-300 transition" />
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-white/20 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-xs text-gray-400 font-mono">{item.year}</span>
                    <p className="font-semibold text-white mt-0.5 text-sm sm:text-base">{item.title}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-white/10">
            {[
              { value: '$4.2B+', label: 'Assets Under Management' },
              { value: '120+',   label: 'Portfolio Companies'     },
              { value: '38',     label: 'Countries Reached'       },
              { value: '22 yrs', label: 'Industry Experience'     },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl sm:text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-xs sm:text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Page nav */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button onClick={() => router.push('/investing')}
              className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
              Investing <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <PageFooter />
      </div>
    </div>
  )
}

function PageFooter() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-2xl font-bold">VEX</p>
        <p className="text-sm text-gray-500">&copy; 2026 VEX Group. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
      </div>
    </footer>
  )
}
