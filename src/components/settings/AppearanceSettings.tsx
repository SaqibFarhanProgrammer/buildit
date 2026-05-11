'use client';

import { useState } from 'react';

export default function AppearanceSettings() {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <div className="space-y-8 sm:space-y-10">
      <div>
        <h2 className="font-['inter-bold'] text-xl sm:text-2xl text-[#0a0a0a] tracking-tight mb-1">
          Appearance
        </h2>
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
          Customize how BuildIt looks for you.
        </p>
      </div>

      <div>
        <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-4">
          Theme
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={`group p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 ${
              theme === 'dark'
                ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-lg shadow-[#0a0a0a]/10'
                : 'border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 bg-white'
            }`}
          >
            <div
              className={`w-full h-20 sm:h-24 rounded-xl mb-4 border-2 ${
                theme === 'dark'
                  ? 'bg-[#1a1a1a] border-white/10'
                  : 'bg-[#1a1a1a] border-[#0a0a0a]/10'
              }`}
            >
              <div className="p-3 space-y-2">
                <div className="w-16 h-1.5 rounded bg-white/10" />
                <div className="w-10 h-1.5 rounded bg-white/10" />
              </div>
            </div>
            <span
              className={`font-['inter-bold'] text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}
            >
              Dark
            </span>
            <p
              className={`font-['inter-light'] text-[10px] sm:text-xs mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-[#0a0a0a]/30'}`}
            >
              Easy on the eyes
            </p>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`group p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 ${
              theme === 'light'
                ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-lg shadow-[#0a0a0a]/10'
                : 'border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 bg-white'
            }`}
          >
            <div
              className={`w-full h-20 sm:h-24 rounded-xl mb-4 border-2 ${
                theme === 'light'
                  ? 'bg-white border-white/10'
                  : 'bg-white border-[#0a0a0a]/10'
              }`}
            >
              <div className="p-3 space-y-2">
                <div className="w-16 h-1.5 rounded bg-[#0a0a0a]/10" />
                <div className="w-10 h-1.5 rounded bg-[#0a0a0a]/10" />
              </div>
            </div>
            <span
              className={`font-['inter-bold'] text-sm sm:text-base ${theme === 'light' ? 'text-white' : 'text-[#0a0a0a]'}`}
            >
              Light
            </span>
            <p
              className={`font-['inter-light'] text-[10px] sm:text-xs mt-1 ${theme === 'light' ? 'text-white/40' : 'text-[#0a0a0a]/30'}`}
            >
              Clean & minimal
            </p>
          </button>
        </div>
      </div>

      <div>
        <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-4">
          Font Size
        </label>
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 w-fit">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-5 py-2.5 rounded-lg text-sm font-['inter-semi'] transition-all ${
                fontSize === size
                  ? 'bg-[#0a0a0a] text-white'
                  : 'text-[#0a0a0a]/30 hover:text-[#0a0a0a]'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
