'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessages from './ChatMeesages';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import type { AiChatResponse, ChatMessage } from '@/types/ai/chat.types';
import axios from 'axios';
import { UserinfoT } from '@/lib/gemini/Ai-Assistent';
import { UserDataT } from '@/types';

const getWelcomeMessage = (): ChatMessage => ({
  id: 1,
  role: 'assistant',
  content: JSON.stringify({
    answer:
      "Hey! I'm BuildIt AI. I can help you write code, debug errors, explain concepts, or review your projects. What are you working on today?",
    code_example: '',
    difficulty: 'General',
  } satisfies AiChatResponse),
  timestamp: 'Just now',
});

type propT = {
  profile: UserDataT;
};

export default function ChatInterface({ profile }: propT) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    getWelcomeMessage(),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userInitials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const userinfo: UserinfoT = {
    userExpreince: profile.profile.experience,
    CodingLevel: profile.profile.codingLevel,
    ROle: profile.profile.role,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClearChat = () => {
    setMessages([getWelcomeMessage()]);
  };

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
      const response = await axios.post('/api/aiexplain/aichat', {
        querry: content,
        userinfo,
      });

      const aiData = response.data?.data as AiChatResponse | undefined;

      if (!aiData?.answer) {
        throw new Error('Empty AI response');
      }

      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: JSON.stringify(aiData),
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      let errorText = 'Something went wrong while communicating with AI';

      if (axios.isAxiosError(error)) {
        errorText =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        errorText = error.message;
      }

      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: JSON.stringify({
          answer: `Sorry, an error occurred: ${errorText}`,
          code_example: '',
          difficulty: 'Error',
        } satisfies AiChatResponse),
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ChatHeader onClearChat={handleClearChat} />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6">
          <ChatMessages messages={messages} userInitials={userInitials} />

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

        <div className="px-6 lg:px-8 pb-6 pt-2">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
