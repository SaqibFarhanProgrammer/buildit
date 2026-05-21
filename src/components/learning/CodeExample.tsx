'use client';

import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CodeBlockProps {
  title: string;
  code: string;
  language: string;
}

export default function CodeBlock({ title, code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\\n');

  return (
    <div className="overflow-hidden rounded-3xl border border-[#f3de8f] shadow-[0_18px_40px_-24px_rgba(149,118,27,0.35)] bg-[#0f172a]">
      <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-[#fff8d1] px-5 py-4">
        <div>
          <span className="block text-sm font-['inter-semi'] text-[#7a5800]">
            {title}
          </span>
          <span className="text-xs text-[#5c5343]">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff4b8] text-[#7a5800] transition-colors duration-200 hover:bg-[#f7dd49]"
        >
          {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
        </button>
      </div>

      <div className="p-5 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-[#e6edf3]">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-[#7c7c8d] select-none w-8 text-right mr-4 shrink-0">
                {i + 1}
              </span>
              <code className="whitespace-pre">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
