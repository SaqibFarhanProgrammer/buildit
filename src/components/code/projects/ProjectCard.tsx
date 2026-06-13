'use client';

import { ProjectType } from '@/types/code-edittor/projects/types';
import Link from 'next/link';
import { languagesMap } from '../../../../data';

interface ProjectCardProps {
  project: ProjectType;
}

const languageColors: Record<string, string> = {
  assembly: 'text-[#6E4C13] bg-[#6E4C13]/10 border-[#6E4C13]/20',
  bash: 'text-[#89E051] bg-[#89E051]/10 border-[#89E051]/20',
  c: 'text-[#A8B9CC] bg-[#A8B9CC]/10 border-[#A8B9CC]/20',
  cpp: 'text-[#00599C] bg-[#00599C]/10 border-[#00599C]/20',
  csharp: 'text-[#9B4F96] bg-[#9B4F96]/10 border-[#9B4F96]/20',
  clojure: 'text-[#5881D8] bg-[#5881D8]/10 border-[#5881D8]/20',
  elixir: 'text-[#6E4A7E] bg-[#6E4A7E]/10 border-[#6E4A7E]/20',
  fsharp: 'text-[#B845FC] bg-[#B845FC]/10 border-[#B845FC]/20',
  go: 'text-[#00ADD8] bg-[#00ADD8]/10 border-[#00ADD8]/20',
  java: 'text-[#FF7800] bg-[#FF7800]/10 border-[#FF7800]/20',
  javascript: 'text-[#F1E05A] bg-[#F1E05A]/10 border-[#F1E05A]/20',
  kotlin: 'text-[#7F52FF] bg-[#7F52FF]/10 border-[#7F52FF]/20',
  lua: 'text-[#000080] bg-[#000080]/10 border-[#000080]/20',
  objectivec: 'text-[#438EFF] bg-[#438EFF]/10 border-[#438EFF]/20',
  pascal: 'text-[#E3F171] bg-[#E3F171]/10 border-[#E3F171]/20',
  perl: 'text-[#0298C3] bg-[#0298C3]/10 border-[#0298C3]/20',
  php: 'text-[#777BB4] bg-[#777BB4]/10 border-[#777BB4]/20',
  python: 'text-[#3776AB] bg-[#3776AB]/10 border-[#3776AB]/20',
  r: 'text-[#276DC3] bg-[#276DC3]/10 border-[#276DC3]/20',
  ruby: 'text-[#CC342D] bg-[#CC342D]/10 border-[#CC342D]/20',
  rust: 'text-[#CE422B] bg-[#CE422B]/10 border-[#CE422B]/20',
  scala: 'text-[#C22D40] bg-[#C22D40]/10 border-[#C22D40]/20',
  sql: 'text-[#F29111] bg-[#F29111]/10 border-[#F29111]/20',
  swift: 'text-[#FA7343] bg-[#FA7343]/10 border-[#FA7343]/20',
  typescript: 'text-[#3178C6] bg-[#3178C6]/10 border-[#3178C6]/20',
  vbnet: 'text-[#945DB7] bg-[#945DB7]/10 border-[#945DB7]/20',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const languageKey = project.language?.toLowerCase() || 'javascript';
  const languageData = languagesMap[languageKey];
  const colorClass =
    languageColors[languageKey] ||
    'text-[#fff]/40 bg-[#f9fafb] border-[#fff]/5';

  return (
    <Link
      href={`/code/${project.name.trim()}?id=${project._id}`}
      className="block"
    >
      <div className="group relative p-5 rounded-xl bg-[#0A0A0A] border border-[#fff]/5 border-[#0004ff]/30  transition-all duration-300">
        <div className="absolute top-4 right-4">
          <span
            className={`w-2 h-2 rounded-full ${
              project.state === 'active' ? 'bg-green-500' : 'bg-[#fff]/20'
            }`}
          />
        </div>

        <div className="mb-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-['inter-semi'] border ${colorClass}`}
          >
            {languageData?.name.split(' (')[0] || project.language}
          </span>
        </div>

        <h3 className="font-['inter-semi'] text-base text-[#fff] mb-1.5 group-hover:text-[#0004ff] transition-colors">
          {project.name}
        </h3>

        <p className="font-['inter-rag'] text-xs text-[#fff]/40 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-4 pt-3 border-t border-[#fff]/5">
          <span className="flex items-center gap-1.5 text-[10px] text-[#fff]/30 font-['inter-rag']">
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
            Files
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-[#000]/30 font-['inter-rag']">
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
            Updated
          </span>
        </div>

        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[#0004ff] text-lg">→</span>
        </div>
      </div>
    </Link>
  );
}
