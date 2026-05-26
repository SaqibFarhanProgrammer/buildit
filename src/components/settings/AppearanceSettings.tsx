'use client';

import { useState } from 'react';

export default function AppearanceSettings() {
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
