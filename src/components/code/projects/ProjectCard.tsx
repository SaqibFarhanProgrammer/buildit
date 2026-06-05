'use client';

import { ProjectType } from '@/types/code-edittor/projects/projects.types';
import Link from 'next/link';
import { languagesMap } from '../../../../data';

interface ProjectCardProps {
  project: ProjectType;
}

const languageColors: Record<string, string> = {
  javascript: 'text-[#F1E05A] bg-[#F1E05A]/10',
  typescript: 'text-[#2B7A0B] bg-[#2B7A0B]/10',
  python: 'text-[#3776AB] bg-[#3776AB]/10',
  java: 'text-[#FF7800] bg-[#FF7800]/10',
  cpp: 'text-[#00599C] bg-[#00599C]/10',
  c: 'text-[#A8B9CC] bg-[#A8B9CC]/10',
  go: 'text-[#00ADD8] bg-[#00ADD8]/10',
  rust: 'text-[#CE422B] bg-[#CE422B]/10',
  kotlin: 'text-[#7F52FF] bg-[#7F52FF]/10',
  php: 'text-[#777BB4] bg-[#777BB4]/10',
  ruby: 'text-[#CC342D] bg-[#CC342D]/10',
  swift: 'text-[#FA7343] bg-[#FA7343]/10',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const languageKey = project.language?.toLowerCase() || 'javascript';
  const languageData = languagesMap[languageKey];
  const colorClass = languageColors[languageKey] || 'text-white/40 bg-white/5';

  return (
    <Link
      href={`/code/${project.name.trim()}?id=${project._id}`}
      className="block"
    >
      <div className="group relative p-5 rounded-xl bg-white/3 border border-white/5 hover:border-[#0004ff]/30 hover:bg-white/5 transition-all duration-300">
        <div className="absolute top-4 right-4">
          <span
            className={`w-2 h-2 rounded-full ${
              project.state === 'active' ? 'bg-green-500' : 'bg-white/20'
            }`}
          />
        </div>

        <div className="mb-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-['inter-semi'] ${colorClass}`}
          >
            {languageData?.name.split(' (')[0] || project.language}
          </span>
        </div>

        <h3 className="font-['inter-semi'] text-base text-white mb-1.5 group-hover:text-[#0004ff] transition-colors">
          {project.name}
        </h3>

        <p className="font-['inter-rag'] text-xs text-white/30 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-4 pt-3 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-[10px] text-white/20 font-['inter-rag']">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-white/20 font-['inter-rag']">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>

        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[#0004ff] text-lg">→</span>
        </div>
      </div>
    </Link>
  );
}
