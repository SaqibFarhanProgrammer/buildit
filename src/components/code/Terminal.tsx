'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditor } from '../../context/EditorProvider.context';
import { RiTerminalLine, RiCloseLine } from 'react-icons/ri';

export default function Terminal() {
  const { setTerminalOpen } = useEditor();
  const [output, setOutput] = useState<string[]>([
    '> npm run dev',
    '',
    '> my-app@1.0.0 dev',
    '> next dev',
    '',
    '  ▲ Next.js 14.2.0',
    '  - Local:        http://localhost:3000',
    '  - Environments: .env.local',
    '',
    ' ✓ Ready in 1.2s',
    '',
    '> Ready on http://localhost:3000',
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setOutput((prev) => [...prev, `> ${input}`, '']);
    setInput('');
  };

  return (
    <div className="h-48 bg-[#0A0A0A] border-t border-white/10 flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <RiTerminalLine className="w-4 h-4 text-white/40" />
          <span className="font-['inter-semi'] text-[10px] text-white/40 uppercase tracking-wider">
            Terminal
          </span>
        </div>
        <button
          onClick={() => setTerminalOpen(false)}
          className="w-6 h-6 rounded flex items-center justify-center text-white/20 hover:text-white/40 hover:bg-white/5 transition-all"
        >
          <RiCloseLine className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono">
        {output.map((line, i) => (
          <div
            key={i}
            className={`font-['inter-rag'] text-xs leading-relaxed ${
              line.startsWith('>') ? 'text-[#0004ff]' : 'text-white/60'
            }`}
          >
            {line || <span>&nbsp;</span>}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-[#0004ff] text-xs">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white/80 focus:outline-none font-['inter-rag']"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
