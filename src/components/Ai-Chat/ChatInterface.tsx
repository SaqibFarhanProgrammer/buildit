'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessages from './ChatMeesages';
import ChatInput from './ChatInput';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      "Hey! I'm BuildIt AI. I can help you write code, debug errors, explain concepts, or review your projects. What are you working on today?",
    timestamp: 'Just now',
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I understand you're asking about "${content}". Let me help you with that.\n\nHere's what I found:\n\n1. First, let's break down the problem\n2. Then identify the key components\n3. Finally, implement the solution\n\nWould you like me to show you the code implementation?`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6">
        <ChatMessages messages={messages} />

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#0004ff] flex items-center justify-center shrink-0 mt-1">
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
            </div>
            <div className="p-4 rounded-2xl bg-[#f9fafb] border border-[#0a0a0a]/5">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full bg-[#0a0a0a]/20 animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#0a0a0a]/20 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#0a0a0a]/20 animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 lg:px-8 pb-6 pt-2">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
