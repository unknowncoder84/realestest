'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import SiteNavbar from '@/components/site-navbar'

/* ── JS-based video fade (no CSS transitions) ── */
function useFadingVideo() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const rafRef      = useRef<number>(0)
  const fadingOutRef = useRef(false)

  const cancelRaf = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }

  const fadeTo = (target: number, duration: number, onDone?: () => void) => {
    cancelRaf()
    const video = videoRef.current
    if (!video) return
    const start     = performance.now()
    const startOpac = video.style.opacity === '' ? 1 : parseFloat(video.style.opacity) || 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      video.style.opacity = String(startOpac + (target - startOpac) * p)
      if (p < 1) { rafRef.current = requestAnimationFrame(tick) }
      else { video.style.opacity = String(target); onDone?.() }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.style.opacity = '0'

    const onCanPlay = () => { fadeTo(1, 500); video.removeEventListener('canplay', onCanPlay) }
    const onTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration - video.currentTime < 0.55) {
        fadingOutRef.current = true
        fadeTo(0, 500)
      }
    }
    const onEnded = () => {
      video.style.opacity = '0'
      fadingOutRef.current = false
      setTimeout(() => { video.currentTime = 0; video.play(); fadeTo(1, 500) }, 100)
    }

    video.addEventListener('canplay',    onCanPlay)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended',      onEnded)
    return () => {
      cancelRaf()
      video.removeEventListener('canplay',    onCanPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended',      onEnded)
    }
  }, [])

  return videoRef
}

export default function InvestingPage() {
  const router   = useRouter()
  const videoRef = useFadingVideo()

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="sticky top-0 z-50"><SiteNavbar /></div>

      {/* ══ VIDEO HERO BG — effect only, no prompt text ══ */}
      <div className="relative w-full h-screen overflow-hidden bg-black">

        {/* Video — shifted down 17% so lower portion shows */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%] z-0"
          style={{ opacity: 0 }}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4" type="video/mp4" />
        </video>

        {/* Liquid glass bottom blur */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
          }} />

        {/* Investing hero text — bottom-left */}
        <div className="absolute bottom-0 left-0 z-10 w-full max-w-2xl px-4 sm:px-6 md:px-12 pb-10 sm:pb-16 pointer-events-none">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 mb-4 sm:mb-5"
            style={{ animation: 'investFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}
          >
            <TrendingUp size={13} /> Investing
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-3 sm:mb-4"
            style={{ letterSpacing: '-0.03em', animation: 'investFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}
          >
            Capital deployed<br />with conviction.
          </h1>
          <p
            className="text-white/60 text-sm sm:text-lg font-light max-w-xl leading-relaxed"
            style={{ animation: 'investFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}
          >
            We invest across stages and sectors — from seed-stage technology companies to large-scale real estate and infrastructure projects.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes investFadeUp {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
      `}</style>

      {/* Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Our Investment Pillars</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-14 sm:mb-20">
            {[
              { title: 'Venture Capital', stage: 'Seed → Series B',    desc: 'We back exceptional founders building category-defining companies in fintech, proptech, climate, and enterprise software.', metrics: ['$800M deployed','60+ portfolio cos','12 unicorns'] },
              { title: 'Growth Equity',   stage: 'Series C → Pre-IPO', desc: 'Partnering with proven businesses ready to scale globally. We bring capital, networks, and operational expertise.',           metrics: ['$1.4B deployed','35 companies','4 IPOs'] },
              { title: 'Real Assets',     stage: 'Direct & Co-invest',  desc: 'Strategic investments in commercial real estate, infrastructure, and natural resources across key global markets.',             metrics: ['$2B+ portfolio','18 markets','95% occupancy'] },
            ].map((p, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/25 transition-colors bg-white/5">
                <span className="text-xs font-mono text-gray-400 bg-white/10 px-2 py-1 rounded mb-4 inline-block">{p.stage}</span>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 sm:mb-6">{p.desc}</p>
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {p.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-white/60" />{m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Featured Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-14 sm:mb-20">
            {[
              { name: 'NovaPay',    sector: 'Fintech',         stage: 'Series B' },
              { name: 'Arcadia RE', sector: 'Proptech',        stage: 'Growth'   },
              { name: 'ClearGrid', sector: 'Climate',          stage: 'Series A' },
              { name: 'Meridian AI',sector: 'Enterprise',      stage: 'Pre-IPO'  },
              { name: 'UrbanStack', sector: 'Proptech',        stage: 'Seed'     },
              { name: 'VaultFi',    sector: 'Fintech',         stage: 'Series A' },
              { name: 'SkyBridge',  sector: 'Infrastructure',  stage: 'Growth'   },
              { name: 'EcoCore',    sector: 'Climate',         stage: 'Series B' },
            ].map((co, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg mb-2 sm:mb-3" />
                <p className="font-semibold text-xs sm:text-sm text-white">{co.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{co.sector} · {co.stage}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white/5 border border-white/10 text-white rounded-2xl p-6 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[{ value:'$4.2B+',label:'Total AUM'},{value:'120+',label:'Portfolio Companies'},{value:'16',label:'Unicorns'},{value:'38',label:'Countries'}].map((s,i)=>(
              <div key={i}><p className="text-2xl sm:text-3xl font-bold mb-1">{s.value}</p><p className="text-xs sm:text-sm text-gray-400">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Page nav */}
      <div className="py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.push('/')} className="text-sm text-gray-400 hover:text-white transition-colors">← Story</button>
          <button onClick={() => router.push('/building')} className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Building <ArrowRight size={16} /></button>
        </div>
      </div>

      <PageFooter />
    </div>
  )
}

function PageFooter() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-10 px-6 md:px-12 lg:px-16">
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
