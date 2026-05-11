'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight, BookOpen, TrendingUp, Building2, Lightbulb,
  MapPin, Users, Award, Globe, DollarSign, ChevronRight
} from 'lucide-react'
import SiteNavbar from '@/components/site-navbar'

export default function RootPage() {
  const router = useRouter()
  const [view, setView]           = useState<'landing' | 'home'>('landing')
  const [landingOp, setLandingOp] = useState(1)
  const [homeOp, setHomeOp]       = useState(0)
  const [textOp, setTextOp]       = useState(0)
  const locked  = useRef(false)
  const touchY  = useRef(0)
  const homeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setTextOp(1), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    router.prefetch('/investing')
    router.prefetch('/building')
    router.prefetch('/advisory')
  }, [router])

  const goHome = () => {
    if (locked.current || view === 'home') return
    locked.current = true
    setTextOp(0)
    // scroll home section to top before revealing
    if (homeRef.current) homeRef.current.scrollTop = 0
    window.scrollTo(0, 0)
    setHomeOp(1)
    setLandingOp(0)
    setTimeout(() => { setView('home'); locked.current = false }, 520)
  }

  const goLanding = () => {
    if (locked.current || view === 'landing') return
    locked.current = true
    setLandingOp(1)
    setHomeOp(0)
    setTimeout(() => { setView('landing'); setTextOp(1); locked.current = false }, 520)
  }

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 8  && view === 'landing') goHome()
      if (e.deltaY < -8 && view === 'home' && window.scrollY === 0) goLanding()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [view])

  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY }
    const onEnd   = (e: TouchEvent) => {
      const diff = touchY.current - e.changedTouches[0].clientY
      if (diff > 30  && view === 'landing') goHome()
      if (diff < -30 && view === 'home' && window.scrollY === 0) goLanding()
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [view])

  return (
    <div className="font-sans" style={{ minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════
          LANDING LAYER
      ══════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-20" style={{
        opacity: landingOp, transition: 'opacity 0.52s ease',
        pointerEvents: view === 'landing' ? 'auto' : 'none',
      }}>
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" type="video/mp4" />
        </video>

        {/* Subtle bottom gradient */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)' }} />

        {/* Centre text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8"
          style={{ opacity: textOp, transition: 'opacity 0.7s ease' }}>
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4 sm:mb-5 font-light">
            Global Real Estate · Capital · Advisory
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] font-light text-white leading-[1.06] mb-4 sm:mb-5"
            style={{ letterSpacing: '-0.03em' }}>
            Where Vision<br />Meets Property.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/55 font-light max-w-xs sm:max-w-lg leading-relaxed mb-10 sm:mb-14">
            Premium developments, strategic investments and expert advisory — across the world&apos;s most sought-after markets.
          </p>
          <div className="flex flex-col items-center gap-2 text-white/35">
            <span className="text-[10px] tracking-[0.25em] uppercase">Scroll to explore</span>
            <div className="w-px h-8 bg-white/30 mt-1" style={{ animation: 'landingPulse 2s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Bottom-left */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-12 z-10"
          style={{ opacity: textOp, transition: 'opacity 0.7s ease 0.2s' }}>
          <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-white/30 font-light">
            New York · London · Dubai · Singapore
          </p>
        </div>

        {/* Bottom-right */}
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 md:right-12 z-10 text-right"
          style={{ opacity: textOp, transition: 'opacity 0.7s ease 0.4s' }}>
          <p className="text-xl sm:text-2xl font-light text-white/75">$4.2B+</p>
          <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-white/30 font-light">Assets Under Management</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HOME LAYER
      ══════════════════════════════════════════════════════ */}
      <div ref={homeRef} className="relative z-10" style={{
        opacity: homeOp, transition: 'opacity 0.52s ease',
        pointerEvents: view === 'home' ? 'auto' : 'none',
        minHeight: '100vh',
      }}>
        {/* Cinematic video bg — fixed */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          }} />
        </div>

        <div className="relative z-10 text-white">
          <SiteNavbar />

          {/* ── HERO INTRO ── */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-12 sm:mb-20">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4 sm:mb-5">
                  <BookOpen size={13} /> Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Built on conviction.<br />Driven by purpose.
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  Founded in 2002, VEX began as a small advisory boutique with a single belief: that the best investments are made at the intersection of deep insight and bold action.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8">
                  Over two decades, we have grown into a global platform spanning venture capital, real estate development, and strategic consulting — with offices across four continents and a portfolio that spans 38 countries.
                </p>
                <button onClick={() => router.push('/investing')}
                  className="inline-flex items-center gap-2 bg-white text-black px-6 sm:px-7 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                  See what we invest in <ArrowRight size={16} />
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20 pt-8 sm:pt-12 border-t border-white/10">
                {[
                  { icon: <DollarSign size={18} />, value: '$4.2B+', label: 'Assets Under Management' },
                  { icon: <Building2 size={18} />,  value: '120+',   label: 'Portfolio Companies'     },
                  { icon: <Globe size={18} />,       value: '38',     label: 'Countries Reached'       },
                  { icon: <Award size={18} />,       value: '22 yrs', label: 'Industry Experience'     },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                    <div className="text-gray-400 mb-2 sm:mb-3">{s.icon}</div>
                    <p className="text-2xl sm:text-3xl font-bold mb-1">{s.value}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Our Journey</h3>
                  <div className="space-y-5 sm:space-y-6">
                    {[
                      { year: '2002', title: 'Founded in New York',  desc: 'Started as a boutique M&A advisory firm with 5 partners and a clear vision.' },
                      { year: '2008', title: 'Launched VEX Capital', desc: 'Expanded into direct investing through our first $200M fund during the financial crisis.' },
                      { year: '2014', title: 'Global Expansion',     desc: 'Opened offices in London and Dubai, entering EMEA markets and growing to 80+ professionals.' },
                      { year: '2020', title: 'VEX Build Division',   desc: 'Launched our real estate development arm across 3 continents, delivering 2M+ sq ft.' },
                      { year: '2024', title: '$4B+ AUM Milestone',   desc: 'Crossed $4 billion in assets under management with 120+ portfolio companies.' },
                    ].map((item, i, arr) => (
                      <div key={i} className="flex gap-4 sm:gap-5 group">
                        <div className="flex flex-col items-center pt-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-white shrink-0 group-hover:bg-gray-300 transition" />
                          {i < arr.length - 1 && <div className="w-px flex-1 bg-white/15 mt-2" />}
                        </div>
                        <div className="pb-4 sm:pb-5">
                          <span className="text-xs text-gray-500 font-mono tracking-wider">{item.year}</span>
                          <p className="font-semibold text-white mt-0.5 mb-1 text-sm sm:text-base">{item.title}</p>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Values */}
                <div className="mt-8 lg:mt-0">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">What Drives Us</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { title: 'Long-term Thinking',    desc: 'We invest with a 10+ year horizon, building relationships and value that compound over time.' },
                      { title: 'Conviction Over Consensus', desc: 'We back ideas others overlook — finding opportunity where conventional wisdom sees risk.' },
                      { title: 'Operator Mindset',      desc: 'Our team has built and run businesses. We bring hands-on expertise, not just capital.' },
                      { title: 'Global Perspective',    desc: 'With offices on four continents, we see patterns and opportunities others miss.' },
                      { title: 'Integrity First',       desc: 'Every decision is made with transparency, accountability, and respect for all stakeholders.' },
                    ].map((v, i) => (
                      <div key={i} className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 shrink-0" />
                        <div>
                          <p className="font-semibold text-white mb-1 text-sm sm:text-base">{v.title}</p>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── WHAT WE DO ── */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
                <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3 block">Our Platform</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                  Three pillars.<br />One vision.
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  VEX operates across investing, building, and advisory — each division reinforcing the others to create compounding value.
                </p>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    icon: <TrendingUp size={22} />,
                    label: 'Investing',
                    path: '/investing',
                    headline: 'Capital with conviction',
                    desc: 'We deploy capital across venture, growth equity, and real assets — backing exceptional founders and assets in 38 markets worldwide.',
                    stats: [{ v: '$4.2B+', l: 'AUM' }, { v: '120+', l: 'Companies' }, { v: '16', l: 'Unicorns' }],
                  },
                  {
                    icon: <Building2 size={22} />,
                    label: 'Building',
                    path: '/building',
                    headline: 'Spaces that inspire',
                    desc: 'Our development division designs and constructs landmark commercial, residential, and mixed-use properties across global gateway cities.',
                    stats: [{ v: '6.5M', l: 'Sq ft' }, { v: '$3.1B', l: 'Value' }, { v: '24', l: 'Projects' }],
                  },
                  {
                    icon: <Lightbulb size={22} />,
                    label: 'Advisory',
                    path: '/advisory',
                    headline: 'Clarity in complexity',
                    desc: 'Strategic counsel for sovereign wealth funds, family offices, and Fortune 500 corporations navigating M&A, capital raises, and transformation.',
                    stats: [{ v: '200+', l: 'Mandates' }, { v: '$12B+', l: 'Deal value' }, { v: '15', l: 'Countries' }],
                  },
                ].map((p, i) => (
                  <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer"
                    onClick={() => router.push(p.path)}>
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        {p.icon}
                      </div>
                      <ChevronRight size={16} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2 block">{p.label}</span>
                    <h3 className="text-lg sm:text-xl font-bold mb-3">{p.headline}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 sm:mb-6">{p.desc}</p>
                    <div className="flex gap-4 sm:gap-6 pt-4 sm:pt-5 border-t border-white/10">
                      {p.stats.map((s, j) => (
                        <div key={j}>
                          <p className="text-base sm:text-lg font-bold">{s.v}</p>
                          <p className="text-xs text-gray-500">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FEATURED PROPERTIES ── */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-8 sm:mb-12">
                <div>
                  <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3 block">Portfolio</span>
                  <h2 className="text-2xl sm:text-4xl font-bold" style={{ letterSpacing: '-0.02em' }}>Featured Properties</h2>
                </div>
                <button onClick={() => router.push('/building')}
                  className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  View all <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[
                  { name: 'One Meridian Tower',  loc: 'New York, USA',  type: 'Commercial',  status: 'Completed',          sqft: '1.2M sq ft', color: 'from-slate-700 to-slate-900'   },
                  { name: 'The Crescent',         loc: 'Dubai, UAE',     type: 'Mixed-Use',   status: 'Under Construction', sqft: '800K sq ft',  color: 'from-amber-900 to-stone-900'  },
                  { name: 'Harbour Point',        loc: 'Singapore',      type: 'Residential', status: 'Completed',          sqft: '450K sq ft',  color: 'from-teal-900 to-slate-900'   },
                  { name: 'Nova Quarter',         loc: 'London, UK',     type: 'Mixed-Use',   status: 'Planning',           sqft: '600K sq ft',  color: 'from-zinc-700 to-zinc-900'    },
                  { name: 'Skyline Residences',   loc: 'Miami, USA',     type: 'Residential', status: 'Under Construction', sqft: '320K sq ft',  color: 'from-blue-900 to-slate-900'   },
                  { name: 'Pacific Hub',          loc: 'Sydney, AU',     type: 'Commercial',  status: 'Completed',          sqft: '550K sq ft',  color: 'from-emerald-900 to-slate-900' },
                ].map((proj, i) => (
                  <div key={i} className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all">
                    <div className={`h-36 sm:h-44 bg-gradient-to-br ${proj.color} relative`}>
                      <div className="absolute bottom-3 left-4">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          proj.status === 'Completed'          ? 'bg-green-500/25 text-green-300'  :
                          proj.status === 'Under Construction' ? 'bg-yellow-500/25 text-yellow-300':
                                                                 'bg-blue-500/25 text-blue-300'
                        }`}>{proj.status}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 bg-white/5">
                      <h3 className="font-semibold mb-1 group-hover:text-gray-200 transition text-sm sm:text-base">{proj.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                        <MapPin size={11} /> {proj.loc}
                      </div>
                      <p className="text-xs text-gray-500">{proj.type} · {proj.sqft}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── GLOBAL PRESENCE ── */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                <div>
                  <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4 block">Global Reach</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 sm:mb-6" style={{ letterSpacing: '-0.02em' }}>
                    Present where<br />it matters most.
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                    With offices in New York, London, Dubai, and Singapore, and active investments across 38 countries, VEX operates at the intersection of the world&apos;s most dynamic real estate and capital markets.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { city: 'New York',  role: 'Global HQ',          flag: '🇺🇸' },
                      { city: 'London',    role: 'EMEA Hub',            flag: '🇬🇧' },
                      { city: 'Dubai',     role: 'Middle East & Africa',flag: '🇦🇪' },
                      { city: 'Singapore', role: 'Asia Pacific',        flag: '🇸🇬' },
                    ].map((o, i) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-xl sm:text-2xl">{o.flag}</span>
                        <div>
                          <p className="font-semibold text-xs sm:text-sm">{o.city}</p>
                          <p className="text-xs text-gray-400 hidden sm:block">{o.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mt-8 lg:mt-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Markets We Serve</h3>
                  {[
                    { region: 'North America', markets: 'USA, Canada, Mexico',              pct: 38 },
                    { region: 'Europe',        markets: 'UK, Germany, France, Netherlands', pct: 27 },
                    { region: 'Middle East',   markets: 'UAE, Saudi Arabia, Qatar',         pct: 20 },
                    { region: 'Asia Pacific',  markets: 'Singapore, Australia, Japan',      pct: 15 },
                  ].map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                        <span className="font-medium">{r.region}</span>
                        <span className="text-gray-400 hidden sm:block">{r.markets}</span>
                        <span className="text-gray-400 sm:hidden">{r.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/60 rounded-full transition-all duration-1000"
                          style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── LEADERSHIP ── */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
                <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3 block">
                  <Users size={12} className="inline mr-1" /> Leadership
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>The team behind VEX</h2>
                <p className="text-gray-400 text-sm">Seasoned operators, investors, and advisors united by a shared mission.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { name: 'James Harlow', role: 'Founder & CEO',              bg: 'from-slate-700 to-slate-900'  },
                  { name: 'Priya Nair',   role: 'Managing Partner, Investing', bg: 'from-zinc-700 to-zinc-900'   },
                  { name: 'Marcus Webb',  role: 'Head of Building',            bg: 'from-stone-700 to-stone-900' },
                  { name: 'Sofia Reyes',  role: 'Chief Advisory Officer',      bg: 'from-neutral-700 to-neutral-900' },
                ].map((m, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className={`bg-gradient-to-br ${m.bg} rounded-2xl h-40 sm:h-60 mb-3 sm:mb-4 relative overflow-hidden border border-white/10`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <p className="font-semibold text-sm sm:text-base">{m.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-8 sm:p-12 md:p-16 text-center">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                  Ready to build something<br />extraordinary?
                </h2>
                <p className="text-gray-400 text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
                  Whether you&apos;re seeking capital, a development partner, or strategic counsel — let&apos;s start a conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button onClick={() => router.push('/advisory')}
                    className="bg-white text-black px-7 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                    Get in Touch
                  </button>
                  <button onClick={() => router.push('/investing')}
                    className="border border-white/20 text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm sm:text-base">
                    Explore Investing
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── PAGE NAV ── */}
          <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <p className="text-sm text-gray-500">Continue exploring VEX</p>
              <button onClick={() => router.push('/investing')}
                className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                Investing <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer className="border-t border-white/10 py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
                <div className="col-span-2 md:col-span-2">
                  <p className="text-2xl font-bold mb-3">VEX</p>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    A global platform for venture, equity, and exchange — investing, building, and advising across markets.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Company</p>
                  <div className="space-y-2">
                    {[['Story','/'],['Investing','/investing'],['Building','/building'],['Advisory','/advisory']].map(([l,p])=>(
                      <button key={l} onClick={() => router.push(p)} className="block text-sm text-gray-400 hover:text-white transition text-left">{l}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Offices</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    {['New York','London','Dubai','Singapore','Sydney'].map(o=><p key={o}>{o}</p>)}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">&copy; 2026 VEX Group. All rights reserved.</p>
                <div className="flex gap-6 text-sm text-gray-500">
                  <a href="#" className="hover:text-white transition">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition">Terms of Use</a>
                </div>
              </div>
            </div>
          </footer>

        </div>{/* end relative z-10 */}
      </div>{/* end home layer */}

      <style>{`
        @keyframes landingPulse {
          0%, 100% { opacity: 0.25; transform: scaleY(0.85); }
          50%       { opacity: 0.7;  transform: scaleY(1.15); }
        }
      `}</style>
    </div>
  )
}
