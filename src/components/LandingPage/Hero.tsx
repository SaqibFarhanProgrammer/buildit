'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative z-40 min-h-[150vh] flex items-center flex-col justify-center overflow-hidden bg-white">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Blue Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#0004ff]/[0.06] via-[#0004ff]/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0004ff]" />
          <span className="text-black/70 text-[11px] font-['inter-semi'] tracking-wide uppercase">
            AI-Powered Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['inter4-medium'] text-[#0a0a0a] leading-[1.05] tracking-tight mb-5">
          Build Better.
          <br />
          <span className="text-[#0004ff]">Ship Faster.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-black/50 max-w-xl mx-auto mb-8 leading-relaxed font-['inter-rag']">
          Code, debug, learn, and ship with AI — all in one unified developer
          workspace.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="bg-[#0004ff] text-white px-7 py-3 rounded-full text-sm font-['inter-semi'] hover:bg-[#0004ff]/90 transition-all duration-200"
          >
            Start Building Free
          </Link>
          <Link
            href="#how-it-works"
            className="border border-black/10 text-[#0a0a0a] px-7 py-3 rounded-full text-sm font-['inter-semi'] hover:border-[#0004ff] hover:text-[#0004ff] transition-all duration-200"
          >
            How It Works
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[10px] text-black/40 uppercase tracking-widest font-['inter-semi']">
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      {/* Dashboard Preview — 20% wider */}
      <div className="relative w-full mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        {/* Blue Glow behind image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[70%] bg-gradient-to-b from-[#0004ff]/[0.08] to-transparent rol blur-[120px] pointer-events-none" />

        <div className="relative flex items-end justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xl shadow-black/10 bg-white w-full max-w-[1100px]">
            <img
              src="https://ik.imagekit.io/05g48qteo/localhost_3000_code_Set20your20coding_20project_id=6a2404d8d0e7aa5ccd3a026c.png"
              className="w-full h-auto object-cover"
              alt="BuildIt Dashboard"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}