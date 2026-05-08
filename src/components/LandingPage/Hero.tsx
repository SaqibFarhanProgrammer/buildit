"use client";

import Link from "next/link";

export default function Hero() {


  return (
    <section
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* Very Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Tiny Decorative Orb */}
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-[#000]/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Compact Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#000]/5 border border-[#000]/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#000]" />
          <span className="text-[#000] text-xs font-semibold tracking-wide uppercase">
            AI-Powered Platform
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] leading-[1.05] tracking-tight mb-5">
          Build Better.
          <br />
          <span className="text-[#000]">Ship Faster.</span>
        </h1>

        {/* Thin Accent Line */}
        <div className="w-16 h-[2px] bg-[#000] mx-auto mb-6" />

        {/* Compact Subheadline */}
        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Code, debug, learn, and ship with AI — all in one unified developer workspace.
        </p>

        {/* Small, Tight CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="bg-[#000] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#000]/90 transition-all duration-200 hover:shadow-md hover:shadow-[#000]/15"
          >
            Start Building Free
          </Link>
          <Link
            href="#how-it-works"
            className="border border-[#0a0a0a]/10 text-[#0a0a0a] px-6 py-2.5 rounded-full text-sm font-semibold hover:border-[#000] hover:text-[#000] transition-all duration-200"
          >
            How It Works
          </Link>
        </div>

        {/* Compact Stats */}
        <div className="mt-12 pt-6 border-t border-gray-50 grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div>
            <div className="text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tight">
              50K+
            </div>
            <div className="text-xs text-gray-400 mt-1">Developers</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tight">
              1M+
            </div>
            <div className="text-xs text-gray-400 mt-1">Projects</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tight">
              99.9%
            </div>
            <div className="text-xs text-gray-400 mt-1">Uptime</div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </section>
  );
}