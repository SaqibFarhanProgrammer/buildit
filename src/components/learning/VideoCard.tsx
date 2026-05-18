'use client';

import { FaPlay } from 'react-icons/fa';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    duration: string;
    description: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group rounded-3xl border border-[#f3de8f] bg-white p-6 shadow-[0_18px_35px_-20px_rgba(149,118,27,0.22)] transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#fff4b8] text-[#7a5800] transition-colors duration-200 group-hover:bg-[#f7dd49]">
          <FaPlay size={14} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-['inter-semi'] text-[#1c1b1d] mb-1 truncate">
            {video.title}
          </h3>
          <p className="text-sm leading-6 text-[#5c5343] mb-3">
            {video.description}
          </p>
          <span className="inline-flex rounded-full bg-[#fff4b8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5800]">
            {video.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
