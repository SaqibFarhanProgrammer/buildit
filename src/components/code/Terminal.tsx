'use client';

import { useRef, useEffect } from 'react';
import { useEditor } from '../../context/EditorProvider.context';
import { RiTerminalLine, RiCloseLine } from 'react-icons/ri';

export default function Terminal() {
  const { setTerminalOpen, output, isRunning } = useEditor();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  return (
    <div className="h-48 bg-[#0A0A0A] border-t border-white/10 flex flex-col terminal">
      {/* Terminal Header */}
      <div className="flex terminal items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <RiTerminalLine className="w-4 h-4 text-white/70" />
          <span className="font-['inter-semi'] text-[10px] text-white/70 uppercase tracking-wider">
            Terminal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTerminalOpen(false)}
            className="w-6 h-6 rounded flex items-center justify-center text-red-200  bg-red-700/20 transition-all"
          >
            <RiCloseLine className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono terminal">
        {isRunning ? (
          <div className="h-full flex items-center justify-center">
            <span className="font-['inter-rag'] text-xs text-white/50">
              Running...
            </span>
          </div>
        ) : output.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <span className="font-['inter-rag'] text-xs text-white/50">
              Click on Run button to see the output
            </span>
          </div>
        ) : (
          <>
            {output.map((line:string, i:number | string) => (
              <div
                key={i}
                className={`font-['inter-rag'] text-xs leading-relaxed ${
                  line.startsWith('>') ? 'text-[#0004ff]' : 'text-white/60'
                }`}
              >
                {line || <span>&nbsp;</span>}
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
}
