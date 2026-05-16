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
    <div className="group p-6 bg-[#f9fafb] rounded-[20px] border border-black/[0.06] hover:border-[#0004ff]/30 transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:bg-[#0004ff] transition-colors duration-200">
          <FaPlay size={14} className="text-white ml-0.5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-['inter-semi'] text-black mb-1 truncate">
            {video.title}
          </h3>
          <p className="text-sm text-[#6b7280] font-['inter-rag'] mb-2">
            {video.description}
          </p>
          <span className="text-xs font-['inter-semi'] text-[#0004ff] bg-[#0004ff]/5 px-2 py-1 rounded-md">
            {video.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
