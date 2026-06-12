'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  RiFileCopyLine,
  RiRefreshLine,
  RiThumbUpLine,
  RiCheckLine,
} from 'react-icons/ri';
import type { AiChatResponse, ChatMessage } from '@/types/ai/chat.types';

function parseAiContent(content: string): AiChatResponse | null {
  try {
    return JSON.parse(content) as AiChatResponse;
  } catch {
    return null;
  }
}

export default function MessageBubble({
  message,
  userInitials = 'You',
}: {
  message: ChatMessage;
  userInitials?: string;
}) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const aiData = !isUser ? parseAiContent(message.content) : null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copyText = aiData
    ? [aiData.answer, aiData.code_example].filter(Boolean).join('\n\n')
    : message.content;

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`flex items-center gap-2 mb-2 ${isUser ? 'flex-row-reverse' : ''}`}
      >
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isUser ? 'bg-[#0a0a0a]' : 'bg-[#0004ff]'
          }`}
        >
          {isUser ? (
            <span className="font-['inter-semi'] text-[10px] text-white">
              {userInitials}
            </span>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          )}
        </div>
        <span
          className={`font-['inter-semi'] text-[10px] uppercase tracking-wider ${
            isUser ? 'text-[#0a0a0a]/40' : 'text-[#0004ff]'
          }`}
        >
          {isUser ? 'You' : 'BuildIt AI'}
        </span>
        <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/20">
          {message.timestamp}
        </span>
      </div>

      <div
        className={`max-w-[85%] sm:max-w-[75%] p-4 sm:p-5 rounded-2xl ${
          isUser
            ? 'bg-[#0a0a0a] text-white rounded-tr-sm'
            : 'bg-[#0004ff]/4 text-[#0a0a0a] border border-[#0004ff]/10 rounded-tl-sm'
        }`}
      >
        {isUser ? (
          <div className="font-['inter-rag'] text-sm leading-relaxed whitespace-pre-wrap text-white/90">
            {message.content}
          </div>
        ) : aiData ? (
          <div className="space-y-3">
            {aiData.difficulty && (
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#0004ff]/10 text-[#0004ff] font-['inter-semi'] text-[10px] uppercase tracking-wider">
                {aiData.difficulty}
              </span>
            )}

            {/* ReactMarkdown is used here to render bold text, lists, and headings properly */}
            <div className="font-['inter-rag'] text-sm leading-relaxed text-[#0a0a0a]/80 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&>h3]:font-bold [&>h3]:mt-2">
              <ReactMarkdown>{aiData.answer}</ReactMarkdown>
            </div>

            {aiData.code_example && (
              <pre className="mt-3 p-3 bg-[#0a0a0a] border border-[#0a0a0a]/10 rounded-lg overflow-x-auto text-xs font-mono text-white/80 leading-relaxed">
                <code>{aiData.code_example}</code>
              </pre>
            )}
          </div>
        ) : (
          <div className="font-['inter-rag'] text-sm leading-relaxed text-[#0a0a0a]/80 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {!isUser && (
        <div className="flex items-center gap-1 mt-2 ml-1">
          <button
            onClick={() => handleCopy(copyText)}
            className="w-7 h-7 rounded-lg hover:bg-[#0004ff]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0004ff] transition-all"
          >
            {copied ? (
              <RiCheckLine className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <RiFileCopyLine className="w-3.5 h-3.5" />
            )}
          </button>
          <button className="w-7 h-7 rounded-lg hover:bg-[#0004ff]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0004ff] transition-all">
            <RiRefreshLine className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 rounded-lg hover:bg-[#0004ff]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0004ff] transition-all">
            <RiThumbUpLine className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
