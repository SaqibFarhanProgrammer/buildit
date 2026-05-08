'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative z-40 min-h-[150vh] flex items-center flex-col justify-center overflow-hidden bg-white pt-16">
      <div
        className="-0  inset-0 opacity-[0.02] z-20 mt-10"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-[#000]/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
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

        <div className="w-16 h-[2px] bg-[#000] mx-auto mb-6" />

        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Code, debug, learn, and ship with AI — all in one unified developer
          workspace.
        </p>

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
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>

      <div className=" bg-red-200 h-screen w-full overflow-hidden ">
        <img
          src="https://i.pinimg.com/originals/c9/1d/20/c91d20eea0a664d98797217efcab11c1.jpg"
          className="h-full  w-full absolute top-0 left-0 -hue-rotate-155 saturate-250 z-0"
          alt=""
        />

        <img
          src="https://undsgn.com/wp-content/uploads/2018/02/image009.jpg"
          className="absolute  bottom-0 left-40"
          alt=""
        />
      </div>
    </section>
  );
}
