'use client';

import { FiSearch, FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import { getAvatarColor, getInitials } from '../utils';

type Props = {
  title: string;
  members: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function BoardHeader({
  title,
  searchQuery,
  onSearchChange,
  members,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/projectmanage"
            className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 hover:text-[#0004ff] transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#0a0a0a]/20" />
          <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
            Board
          </span>
        </div>
        <h1 className="font-['inter-bold'] text-2xl sm:text-3xl tracking-tight text-[#0a0a0a]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center -space-x-2">
          {members.slice(0, 4).map((member) => (
            <div
              key={member.id}
              className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(member.name)}`}
              title={member.name}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(member.name)
              )}
            </div>
          ))}
          {members.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-[#f9fafb] border-2 border-white flex items-center justify-center text-[10px] font-['inter-semi'] text-[#0a0a0a]/40">
              +{members.length - 4}
            </div>
          )}
        </div>

        <div className="relative w-64">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30"
            size={14}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#f9fafb] border border-[#0a0a0a]/5 rounded-xl pl-9 pr-4 py-2 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-semi'] text-[#0a0a0a]/60 hover:bg-white transition-all">
          <FiFilter size={14} />
          Filter
        </button>
      </div>
    </div>
  );
}
