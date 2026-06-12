'use client';

import { useState, KeyboardEvent } from 'react';
import { RiSendPlaneFill, RiAttachment2, RiCommandLine } from 'react-icons/ri';
import type { ChatInputProps } from '@/types/ai/chat.types';

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
    <div className="relative ">
      <div className="flex  items-end gap-3 p-4 sm:p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 focus-within:border-[#0004ff] focus-within:ring-1 focus-within:ring-[#0004ff]/20 transition-all shadow-xl shadow-black/10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about code..."
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm font-['inter-rag'] text-white placeholder:text-white/20 focus:outline-none resize-none max-h-30 min-h-[22px] py-[8px] leading-relaxed"
          style={{ fieldSizing: 'content' }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0004ff] text-white flex items-center justify-center hover:bg-[#0004ff]/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed shrink-0"
        >
          <RiSendPlaneFill className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
