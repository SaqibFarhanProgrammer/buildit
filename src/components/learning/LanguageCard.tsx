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
      className="group block transform rounded-[28px] border border-[#f3de8f] bg-white shadow-[0_18px_45px_-18px_rgba(149,118,27,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_65px_-25px_rgba(149,118,27,0.25)]"
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#fff4b8] text-4xl text-[#7a5800]">
            {language.icon}
          </span>
          <span className="rounded-full border border-[#f3de8f] bg-[#fff6c8] px-3 py-1 text-xs font-['inter-semi'] text-[#7a5800]">
            {language.difficulty}
          </span>
        </div>

        <h3 className="text-2xl font-['inter-bold'] text-[#1c1b1d] mb-3">
          {language.name}
        </h3>

        <p className="text-sm leading-relaxed text-[#5c5343] mb-8">
          {language.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-['inter-rag'] text-[#8b7a4c]">
            {language.videoCount} videos
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4b8] text-[#7a5800] shadow-sm transition-colors duration-200 group-hover:bg-[#f7dd49]">
            <FaArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
