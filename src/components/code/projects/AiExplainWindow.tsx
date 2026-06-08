'use client';

import { useState } from 'react';
import {
  RiCloseLine,
  RiSparklingLine,
  RiFileCopyLine,
  RiCheckLine,
  RiCodeLine,
  RiRobot2Line,
} from 'react-icons/ri';
import { GoHubot } from 'react-icons/go';

import { useEditor } from '@/context/EditorProvider.context';

export default function AIExplainWindow() {
  const { setIsAiExplainWindowOpen } = useEditor();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0004ff]/15 flex items-center justify-center">
            <RiSparklingLine className="w-4 h-4 text-[#0004ff]" />
          </div>
          <div>
            <h3 className="text-white/90 font-[inter-semi] text-sm">
              BuildIt AI
            </h3>
            <p className="text-white/30 text-[10px] font-[inter-rag]">
              Code Explainer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-white/40 font-[\'inter-semi\']">
              Online
            </span>
          </div>
          <button
            onClick={() => setIsAiExplainWindowOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Explanation Content — Scrollable, No Chat */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-hide">
        {/* Code Block */}
        <div className="rounded-xl bg-[#111111] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <RiCodeLine className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[10px] text-white/30 font-[\'inter-semi\'] uppercase tracking-wider">
                typescript
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-all"
            >
              {copied ? (
                <RiCheckLine className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <RiFileCopyLine className="w-3.5 h-3.5" />
              )}
              <span className="text-[10px] font-[\'inter-semi\']">
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>
          <pre className="px-4 py-3 text-[11px] text-white/60 font-mono leading-relaxed overflow-x-auto">
            {`const handleSave = () => {
  setIsSaveCodeIsOpen(true);
};

const handleRun = async () => {
  if (!CodeValue.trim()) {
    setOutput([\'No code to run.\']);
    return;
  }
  setIsRunning(true);
  // ...
};`}
          </pre>
        </div>

        {/* AI Explanation */}
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#0004ff]/15 flex items-center justify-center shrink-0">
            <GoHubot className="w-3.5 h-3.5 text-[#0004ff]" />
          </div>
          <div className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.04] text-white/70 text-sm font-[inter-rag] leading-relaxed space-y-3">
            <p>This code defines two functions for a code editor toolbar:</p>
            <div className="space-y-2">
              <p>
                <span className="text-white font-[\'inter-semi\']">
                  handleSave
                </span>{' '}
                — Opens a save confirmation popup by setting the save modal
                state to true.
              </p>
              <p>
                <span className="text-white font-[\'inter-semi\']">
                  handleRun
                </span>{' '}
                — Validates code input, sets loading state, and executes the
                code through an API call.
              </p>
            </div>
            <p>
              Both functions use React state setters from the editor context to
              manage UI state.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar — No Input, Just Status */}
      <div className="px-5 py-3 border-t border-white/[0.06] shrink-0">
        <p className="text-center text-[10px] text-white/15 font-[\'inter-rag\']">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
