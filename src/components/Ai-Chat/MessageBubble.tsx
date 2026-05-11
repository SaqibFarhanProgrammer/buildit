interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      {/* Avatar + Name Row */}
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
              AC
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

      {/* Message Content */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] p-4 sm:p-5 rounded-2xl ${
          isUser
            ? 'bg-[#0a0a0a] text-white rounded-tr-sm'
            : 'bg-[#f9fafb] text-[#0a0a0a] border border-[#0a0a0a]/5 rounded-tl-sm'
        }`}
      >
        <div
          className={`font-['inter-rag'] text-sm leading-relaxed whitespace-pre-wrap ${
            isUser ? 'text-white/90' : 'text-[#0a0a0a]/80'
          }`}
        >
          {message.content}
        </div>
      </div>

      {/* Action Buttons (only for AI) */}
      {!isUser && (
        <div className="flex items-center gap-1 mt-2 ml-1">
          <button className="w-7 h-7 rounded-lg hover:bg-[#0a0a0a]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0a0a0a]/40 transition-all">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="w-7 h-7 rounded-lg hover:bg-[#0a0a0a]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0a0a0a]/40 transition-all">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button className="w-7 h-7 rounded-lg hover:bg-[#0a0a0a]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0a0a0a]/40 transition-all">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
