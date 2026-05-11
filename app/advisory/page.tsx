'use client'

import { ArrowRight, Lightbulb, Mail, Phone, MapPin, Users, ArrowUpRight, ChevronRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

const LINKS = [
  { label: 'Story',     path: '/home'      },
  { label: 'Investing', path: '/investing' },
  { label: 'Building',  path: '/building'  },
  { label: 'Advisory',  path: '/advisory'  },
]

export default function AdvisoryPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ══ FULL-SCREEN HERO — navbar floats inside ══ */}
      <div className="w-full h-screen flex items-center justify-center p-2 sm:p-3 md:p-5 bg-[#f0f0f0]">
        <section className="relative w-full max-w-[1536px] h-full rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center">

          {/* Video background */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4" type="video/mp4" />
          </video>

          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-[1]" />

          {/* ── NAVBAR floating inside hero ── */}
          <div className="absolute top-0 inset-x-0 z-20 px-4 sm:px-6 md:px-8 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <button onClick={() => router.push('/')}
                className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-70 transition-opacity">
                VEX
              </button>

              {/* Nav links — desktop */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8 bg-white/95 backdrop-blur-md rounded-full px-6 py-2.5 border border-white/20 shadow-sm">
                {LINKS.map(l => (
                  <button key={l.label} onClick={() => router.push(l.path)}
                    className={`text-sm font-medium transition-colors ${l.path === '/advisory' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-white transition-colors shadow-sm">
                  <Search size={14} /> Search
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-form')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-black text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                  Start a Chat
                </button>
              </div>
            </div>
          </div>

          {/* ── Hero content ── */}
          <div className="relative z-10 w-full h-full flex flex-col items-center">

            {/* Centre text */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">
              <motion.span
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/70 mb-4 sm:mb-5"
              >
                <Lightbulb size={13} /> Advisory
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[88px] font-light text-white leading-[1.06] mb-4 sm:mb-5 drop-shadow-lg"
                style={{ letterSpacing: '-0.03em' }}
              >
                Strategic counsel<br />for complex decisions.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-sm sm:text-base md:text-lg text-white/75 max-w-xs sm:max-w-xl leading-relaxed font-light drop-shadow"
              >
                Serving sovereign wealth funds, family offices, and Fortune 500 corporations — we bring clarity to complexity.
              </motion.p>
            </div>

            {/* ── Bottom-left glass card ── */}
            <motion.div
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-20 left-4 sm:bottom-8 sm:left-6 md:bottom-10 md:left-10 p-3 sm:p-4 lg:p-5 rounded-[1.2rem] sm:rounded-[1.5rem] lg:rounded-[2.2rem] bg-white/30 backdrop-blur-xl flex flex-col gap-2 lg:gap-3 min-w-[130px] sm:min-w-[160px] lg:min-w-[180px] w-fit"
            >
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-normal text-[rgba(30,50,90,0.95)] tracking-tight">200+</span>
                <span className="text-[9px] sm:text-[11px] font-normal text-[rgba(30,50,90,0.65)] uppercase tracking-wider">Advisory Mandates</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const el = document.getElementById('contact-form')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center bg-white rounded-full pl-1.5 pr-4 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start"
              >
                <div className="bg-[rgba(30,50,90,0.1)] p-1 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[rgba(30,50,90,0.9)]" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-normal text-[rgba(30,50,90,0.9)]">Work with us</span>
              </motion.button>
            </motion.div>

            {/* ── Bottom-right faux-cutout corner ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 bg-[#f0f0f0] rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6"
            >
              {/* Corner masks */}
              <div className="absolute -top-[1.5rem] sm:-top-[2rem] md:-top-[3.5rem] right-0 w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none"><path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/></svg>
              </div>
              <div className="absolute bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem] w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none"><path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/></svg>
              </div>
              <div className="bg-[rgba(30,50,90,0.05)] w-9 h-9 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-[rgba(30,50,90,0.1)]">
                <ArrowUpRight className="w-3.5 h-3.5 md:w-5 md:h-5 text-[rgba(30,50,90,0.8)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[20px] font-normal text-[rgba(30,50,90,0.95)]">Our Services</span>
                <div className="flex items-center gap-1 text-[rgba(30,50,90,0.6)] cursor-pointer hover:text-[rgba(30,50,90,0.8)] transition-colors">
                  <span className="text-[11px] md:text-[15px] font-normal">Explore</span>
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>

      {/* ══ SERVICES + TEAM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Services */}
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start mb-16 sm:mb-24">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">What we do</h2>
              <p className="text-gray-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                With deep sector expertise and a global network of relationships, VEX Advisory delivers insights that move the needle — whether navigating M&A, capital raises, market entry, or organisational transformation.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('contact-form')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-black text-white px-6 sm:px-7 py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2 text-sm sm:text-base">
                Work with us <ArrowRight size={16} />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { title: 'Mergers & Acquisitions',   desc: 'Buy-side and sell-side advisory, due diligence, valuation, and deal structuring across sectors and geographies.' },
                { title: 'Capital Markets',           desc: 'Debt and equity capital raising, IPO readiness, investor relations strategy, and roadshow preparation.' },
                { title: 'Market Entry & Expansion', desc: 'Go-to-market strategy, regulatory navigation, and partnership development for companies entering new markets.' },
                { title: 'Organisational Strategy',  desc: 'Leadership alignment, operating model design, and transformation programmes for boards and C-suites.' },
                { title: 'ESG & Impact',              desc: 'Sustainability strategy, ESG reporting frameworks, and impact measurement for investors and corporates.' },
              ].map((s, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-black hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-1.5 text-sm sm:text-base">{s.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                    <ArrowRight size={15} className="text-gray-300 group-hover:text-black transition mt-1 shrink-0 ml-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16 sm:mb-24">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6 sm:mb-8">
              <Users size={14} /> Leadership
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: 'James Harlow', role: 'Founder & CEO',              bg: 'bg-gray-200' },
                { name: 'Priya Nair',   role: 'Managing Partner, Investing', bg: 'bg-gray-300' },
                { name: 'Marcus Webb',  role: 'Head of Building',            bg: 'bg-gray-200' },
                { name: 'Sofia Reyes',  role: 'Chief Advisory Officer',      bg: 'bg-gray-300' },
              ].map((m, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className={`${m.bg} rounded-2xl h-36 sm:h-56 mb-3 sm:mb-4 overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <p className="font-semibold text-sm sm:text-base">{m.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{m.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div id="contact-form" className="grid lg:grid-cols-2 gap-10 sm:gap-16 pt-12 sm:pt-16 border-t border-gray-100">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                <Mail size={14} /> Contact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5 sm:mb-6">Let&apos;s start a conversation.</h2>
              <p className="text-gray-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Whether you&apos;re an entrepreneur seeking capital, a developer looking for a partner, or an organisation in need of strategic counsel — we&apos;d love to hear from you.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: <Mail size={16} />,  label: 'Email', value: 'hello@vex.com'                  },
                  { icon: <Phone size={16} />, label: 'Phone', value: '+1 (212) 555-0190'              },
                  { icon: <MapPin size={16} />,label: 'HQ',    value: '1 World Trade Center, New York' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 shrink-0">{c.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400">{c.label}</p>
                      <p className="text-sm font-medium">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form className="space-y-4 sm:space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">First Name</label>
                  <input type="text" placeholder="James" className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-black transition" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Last Name</label>
                  <input type="text" placeholder="Harlow" className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-black transition" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">Email</label>
                <input type="email" placeholder="james@company.com" className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-black transition" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">I&apos;m interested in</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-black transition text-gray-700">
                  <option>Advisory Services</option>
                  <option>Investing / Capital</option>
                  <option>Real Estate Development</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">Message</label>
                <textarea rows={4} placeholder="Tell us about your project..." className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-black transition resize-none" />
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm sm:text-base">
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Page nav */}
      <div className="py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.push('/building')} className="text-sm text-gray-400 hover:text-black transition-colors">← Building</button>
          <button onClick={() => router.push('/')} className="text-sm text-gray-400 hover:text-black transition-colors">Back to Home →</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
            <div className="col-span-2 md:col-span-2">
              <p className="text-2xl font-bold mb-3">VEX</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">A global platform for venture, equity, and exchange — investing, building, and advising across markets.</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Company</p>
              <div className="space-y-2">
                {[['Story','/home'],['Investing','/investing'],['Building','/building'],['Advisory','/advisory']].map(([l,p])=>(
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
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">&copy; 2026 VEX Group. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
