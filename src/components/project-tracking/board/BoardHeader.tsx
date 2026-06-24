'use client';

import { FiSearch, FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import { getAvatarColor, getInitials } from '../utils';

type Props = {
  title: string;
};

export default function BoardHeader({ title }: Props) {
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
    </div>
  );
}
