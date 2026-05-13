'use client';

import { useState, KeyboardEvent } from 'react';
import { RiSendPlaneFill, RiAttachment2, RiCommandLine } from 'react-icons/ri';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <div className="flex fixed  bottom-2 left-100 w-[50vw] items-end gap-3 p-4 sm:p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 focus-within:border-[#0004ff] focus-within:ring-1 focus-within:ring-[#0004ff]/20 transition-all shadow-xl shadow-black/20">
        <button
          type="button"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/20 hover:text-white/40 hover:bg-white/5 transition-all shrink-0"
        >
          <RiAttachment2 className="w-5 h-5" />
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about code..."
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm font-['inter-rag'] text-white placeholder:text-white/20 focus:outline-none resize-none max-h-32 min-h-[24px] py-1.5 leading-relaxed"
          style={{ fieldSizing: 'content' }}
        />

        <div className="hidden sm:flex items-center gap-1 text-white/10 shrink-0 mr-1">
          <RiCommandLine className="w-3 h-3" />
          <span className="font-['inter-light'] text-[10px]">K</span>
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0004ff] text-white flex items-center justify-center hover:bg-[#0004ff]/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed shrink-0"
        >
          <RiSendPlaneFill className="w-5 h-5" />
        </button>
      </div>

      <p className="font-['inter-light'] text-[10px] text-white/10 text-center mt-3">
        BuildIt AI may produce inaccurate information. Verify important code.
      </p>
    </div>
  );
}
