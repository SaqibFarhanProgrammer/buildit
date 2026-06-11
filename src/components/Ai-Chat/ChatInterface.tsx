'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessages from './ChatMeesages';
import ChatInput from './ChatInput';

import type { ChatMessage } from '@/types/ai/chat.types';
import axios from 'axios';
import { UserDataT } from '@/utils/GetProfiledata';
import { UserinfoT } from '@/lib/gemini/Ai-Assistent';

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: JSON.stringify({
      answer:
        "Hey! I'm BuildIt AI. I can help you write code, debug errors, explain concepts, or review your projects. What are you working on today?",
      code_example: '',
      difficulty: 'General',
    }),
    timestamp: 'Just now',
  },
];

type propT = {
  profile: UserDataT;
};

export default function ChatInterface({ profile }: propT) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const userinfo: UserinfoT = {
    userExpreince: profile.profile.experience,
    CodingLevel: profile.profile.codingLevel,
    ROle: profile.profile.role,
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

   const handleSend = async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 1. Axios patch request syntax error ko fix kiya gaya hai
      const response = await axios.patch('/api/chat', {
        querry: content,
        userinfo: userinfo,
      });

      // 2. Response parsing condition ko tight aur accurate kiya
      if (response.data && response.data.data) {
        const aiMsg: ChatMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: JSON.stringify(response.data.data),
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error: any) {
      // Axios error ya general error handling snippet
      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: JSON.stringify({
          answer: `Sorry, an error occurred: ${error?.response?.data?.error || error?.message || 'Something went wrong.'}`,
          code_example: '',
          difficulty: 'Error',
        }),
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
            <div className="p-4 rounded-2xl bg-[#0004ff]/4 border border-[#0004ff]/10">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full bg-[#0004ff]/40 animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#0004ff]/40 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#0004ff]/40 animate-bounce"
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
