'use client';

import { ProjectTrackingT } from '@/types/project tracking/types';

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'active', label: 'Active' },
  { id: 'archive', label: 'Archived' },
  { id: 'my', label: 'My Projects' },
];

type Props = {
  projects: ProjectTrackingT[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
};

export default function ProjectTrackingFilters({
  projects,
  activeFilter,
  onFilterChange,
}: Props) {
  const activeCount = projects.filter((p) => p.state === 'active').length;
  const archiveCount = projects.filter((p) => p.state === 'archive').length;
  const myCount = projects.filter((p) => p.isAdmin).length;

  const counts: Record<string, number> = {
    all: projects.length,
    active: activeCount,
    archive: archiveCount,
    my: myCount,
  };

  return (
    <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 w-fit mb-8 sm:mb-10 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative px-4 sm:px-5 py-2.5 rounded-lg text-sm font-['inter-semi'] transition-all duration-200 whitespace-nowrap ${
            activeFilter === filter.id
              ? 'bg-[#0a0a0a] text-white'
              : 'text-[#0a0a0a]/30 hover:text-[#0a0a0a]'
          }`}
        >
          {filter.label}
          <span
            className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
              activeFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30'
            }`}
          >
            {counts[filter.id]}
          </span>
        </button>
      ))}
    </div>
  );
}
