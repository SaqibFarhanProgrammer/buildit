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
    <div className="rounded-[20px] border border-black/[0.08] overflow-hidden bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <span className="text-sm font-['inter-semi'] text-white">{title}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b7280] font-['inter-rag']">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-[#6b7280] hover:text-[#0004ff] transition-colors duration-200"
          >
            {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
          </button>
        </div>
      </div>

      <div className="p-5 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-[#6b7280] select-none w-8 text-right mr-4 flex-shrink-0">
                {i + 1}
              </span>
              <code className="text-[#e6edf3] whitespace-pre">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
