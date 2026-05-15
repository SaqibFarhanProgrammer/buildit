'use client';

import { ProjectType } from '@/types/code-edittor/projects/projects.types';

interface ProjectCardProps {
  project: ProjectType;
}

const languageColors: Record<string, string> = {
  TypeScript: 'text-[#79C0FF] bg-[#79C0FF]/10',
  JavaScript: 'text-[#F1E05A] bg-[#F1E05A]/10',
  Python: 'text-[#7EE787] bg-[#7EE787]/10',
  Java: 'text-[#FFA657] bg-[#FFA657]/10',
  'C++': 'text-[#FF7B72] bg-[#FF7B72]/10',
  Go: 'text-[#79C0FF] bg-[#79C0FF]/10',
  Rust: 'text-[#FFA657] bg-[#FFA657]/10',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const timeAgo = getTimeAgo(project.lastModified);

  return (
    <div className="group relative p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#0004ff]/30 hover:bg-white/[0.05] transition-all duration-300">
      <div className="absolute top-4 right-4">
        <span
          className={`w-2 h-2 rounded-full ${
            project.status === 'Active' ? 'bg-green-500' : 'bg-white/20'
          }`}
        />
      </div>

      <div className="mb-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-['inter-semi'] ${
            languageColors[project.language] || 'text-white/40 bg-white/5'
          }`}
        >
          {project.language}
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
          {project.filesCount} files
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
          {timeAgo}
        </span>
      </div>

      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[#0004ff] text-lg">→</span>
      </div>
    </div>
  );
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
