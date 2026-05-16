'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface LanguageCardProps {
  language: {
    slug: string;
    name: string;
    description: string;
    icon: string;
    difficulty: string;
    videoCount: number;
  };
}

export default function LanguageCard({ language }: LanguageCardProps) {
  return (
    <Link
      href={`/learning/${language.slug}`}
      className="group block p-8 bg-[#f9fafb] rounded-[24px] border border-black/[0.06] hover:border-[#0004ff]/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-4xl">{language.icon}</span>
        <span className="px-3 py-1 bg-white text-xs font-['inter-semi'] text-black rounded-full border border-black/[0.06]">
          {language.difficulty}
        </span>
      </div>

      <h3 className="text-2xl font-['inter-bold'] text-black mb-3">
        {language.name}
      </h3>

      <p className="text-[#6b7280] font-['inter-rag'] text-sm leading-relaxed mb-6">
        {language.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-[#6b7280] font-['inter-rag']">
          {language.videoCount} videos
        </span>
        <span className="text-[#0004ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FaArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
