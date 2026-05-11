'use client'

import { ArrowRight, BookOpen } from 'lucide-react'
import SiteNavbar from '@/components/site-navbar'
import { useRouter } from 'next/navigation'

export default function StoryPage() {
  const router = useRouter()

  return (
    <div className="bg-black text-white font-sans">

      {/* ══════════════════════════════════════
          CINEMATIC VIDEO HERO — pure bg effect
          Navbar floats centered over the video
      ══════════════════════════════════════ */}
      <div className="relative w-full h-screen overflow-hidden">

        {/* Raw video — no text, no dark overlay */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
            type="video/mp4"
          />
        </video>

        {/* Bottom blur fade — blur only, no dark gradient */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          }}
        />

        {/* Navbar — centered vertically over the video, exactly like the screenshot */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10">
          <SiteNavbar />
        </div>
      </div>

      {/* ══════════════════════════════════════
          STORY CONTENT
      ══════════════════════════════════════ */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                <BookOpen size={14} /> Our Story
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Built on conviction.<br />Driven by purpose.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Founded in 2002, VEX began as a small advisory boutique with a single belief: that the best investments are made at the intersection of deep insight and bold action. Over two decades, we have grown into a global platform spanning venture capital, real estate development, and strategic consulting.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our team of 200+ professionals operates across New York, London, Dubai, and Singapore — united by a shared commitment to creating lasting value for our partners, portfolio companies, and communities.
              </p>
              <button
                onClick={() => router.push('/investing')}
                className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all"
              >
                See what we invest in <ArrowRight size={16} />
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {[
                { year: '2002', title: 'Founded in New York', desc: 'Started as a boutique M&A advisory firm with 5 partners.' },
                { year: '2008', title: 'Launched VEX Capital', desc: 'Expanded into direct investing through our first $200M fund.' },
                { year: '2014', title: 'Global Expansion', desc: 'Opened offices in London and Dubai, entering EMEA markets.' },
                { year: '2020', title: 'VEX Build Division', desc: 'Launched our real estate development arm across 3 continents.' },
                { year: '2024', title: '$4B+ AUM Milestone', desc: 'Crossed $4 billion in assets under management.' },
              ].map((item, i, arr) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-white mt-1.5 group-hover:bg-gray-300 transition" />
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-gray-700 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-xs text-gray-500 font-mono">{item.year}</span>
                    <p className="font-semibold text-white mt-0.5">{item.title}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">
            {[
              { value: '$4.2B+', label: 'Assets Under Management' },
              { value: '120+', label: 'Portfolio Companies' },
              { value: '38', label: 'Countries Reached' },
              { value: '22 yrs', label: 'Industry Experience' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next page CTA */}
      <div className="bg-black py-16 px-6 md:px-12 lg:px-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-gray-400 text-sm">Continue exploring VEX</p>
          <button
            onClick={() => router.push('/investing')}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Investing <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 lg:px-16 border-t border-gray-800">
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
