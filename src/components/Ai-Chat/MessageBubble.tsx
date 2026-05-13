import { RiFileCopyLine, RiRefreshLine, RiThumbUpLine } from 'react-icons/ri';

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
            : 'bg-[#0004ff]/[0.04] text-[#0a0a0a] border border-[#0004ff]/10 rounded-tl-sm'
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

      {/* Action Buttons (only for AI) — React Icons */}
      {!isUser && (
        <div className="flex items-center gap-1 mt-2 ml-1">
          <button className="w-7 h-7 rounded-lg hover:bg-[#0004ff]/5 flex items-center justify-center text-[#0a0a0a]/20 hover:text-[#0004ff] transition-all">
            <RiFileCopyLine className="w-3.5 h-3.5" />
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
