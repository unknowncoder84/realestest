'use client'

import { ArrowRight, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SiteNavbar from '@/components/site-navbar'

export default function BuildingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="sticky top-0 z-50"><SiteNavbar /></div>

      {/* ══ ANIMATED DARK HERO BG (replaces Spline — WebGL not available) ══ */}
      <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">

        {/* Animated gradient orbs — mimics the Spline dark/green aesthetic */}
        <div className="absolute inset-0 z-0">
          {/* Primary green orb */}
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(119,99%,46%) 0%, transparent 70%)',
              top: '10%', left: '20%',
              animation: 'orb1 8s ease-in-out infinite alternate',
            }} />
          {/* Secondary green orb */}
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(119,99%,46%) 0%, transparent 70%)',
              bottom: '15%', right: '15%',
              animation: 'orb2 10s ease-in-out infinite alternate',
            }} />
          {/* Dark teal accent */}
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #00ffcc 0%, transparent 70%)',
              top: '40%', right: '30%',
              animation: 'orb3 12s ease-in-out infinite alternate',
            }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

        {/* Building hero text — bottom-left */}
        <div className="absolute bottom-0 left-0 z-10 w-full max-w-2xl px-4 sm:px-6 md:px-12 pb-10 sm:pb-16 pointer-events-none">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5"
            style={{ color: 'hsl(119,99%,46%)', animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <Building2 size={13} /> Building
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-3 sm:mb-4"
            style={{ letterSpacing: '-0.03em', animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
            Developing spaces<br />that inspire.
          </h1>
          <p className="text-white/60 text-sm sm:text-lg font-light max-w-xl leading-relaxed"
            style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
            Landmark commercial, residential, and mixed-use properties across global gateway cities.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        @keyframes orb1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes orb2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-50px, -30px) scale(1.2); }
        }
        @keyframes orb3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 60px) scale(0.9); }
        }
      `}</style>

      {/* Projects */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Active Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-14 sm:mb-20">
            {[
              { name: 'One Meridian Tower',  location: 'New York, USA', type: 'Commercial',  status: 'Completed',          sqft: '1.2M sq ft' },
              { name: 'The Crescent',        location: 'Dubai, UAE',    type: 'Mixed-Use',   status: 'Under Construction', sqft: '800K sq ft'  },
              { name: 'Harbour Point',       location: 'Singapore',     type: 'Residential', status: 'Completed',          sqft: '450K sq ft'  },
              { name: 'Nova Quarter',        location: 'London, UK',    type: 'Mixed-Use',   status: 'Planning',           sqft: '600K sq ft'  },
              { name: 'Skyline Residences',  location: 'Miami, USA',    type: 'Residential', status: 'Under Construction', sqft: '320K sq ft'  },
              { name: 'Pacific Hub',         location: 'Sydney, AU',    type: 'Commercial',  status: 'Completed',          sqft: '550K sq ft'  },
            ].map((proj, i) => (
              <div key={i} className="group cursor-pointer border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-colors bg-white/5">
                <div className="bg-gray-100 h-40 sm:h-52 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      proj.status === 'Completed'          ? 'bg-green-100 text-green-700'  :
                      proj.status === 'Under Construction' ? 'bg-yellow-100 text-yellow-700':
                                                             'bg-blue-100 text-blue-700'
                    }`}>{proj.status}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold mb-1 text-white text-sm sm:text-base">{proj.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{proj.location} · {proj.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{proj.sqft}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 py-10 sm:py-12 border-t border-white/10">
            {[{value:'6.5M',label:'Sq ft developed'},{value:'$3.1B',label:'Total project value'},{value:'24',label:'Active projects'},{value:'12',label:'Cities worldwide'}].map((s,i)=>(
              <div key={i}><p className="text-2xl sm:text-3xl font-bold mb-1 text-white">{s.value}</p><p className="text-xs sm:text-sm text-gray-400">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Page nav */}
      <div className="py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.push('/investing')} className="text-sm text-gray-400 hover:text-white transition-colors">← Investing</button>
          <button onClick={() => router.push('/advisory')} className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Advisory <ArrowRight size={16} /></button>
        </div>
      </div>

      <PageFooter />
    </div>
  )
}

function PageFooter() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-12 lg:px-16">
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
