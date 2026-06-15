'use client';

import { FiFolder } from 'react-icons/fi';

type Props = {
  searchQuery: string;
  onCreateClick: () => void;
};

export default function ProjectTrackingEmptyState({
  searchQuery,
  onCreateClick,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-[#f9fafb] border border-[#0a0a0a]/5 flex items-center justify-center mb-4">
        <FiFolder className="w-8 h-8 text-[#0a0a0a]/20" />
      </div>
      <h3 className="font-['inter-semi'] text-lg text-[#0a0a0a]/60 mb-2">
        {searchQuery ? 'No projects found' : 'No projects yet'}
      </h3>
      <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/30 mb-6 text-center max-w-sm">
        {searchQuery
          ? `No projects match "${searchQuery}". Try a different search.`
          : 'Create your first project to start tracking tasks.'}
      </p>
      <button
        onClick={onCreateClick}
        className="bg-[#0004ff] text-white px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] hover:bg-[#0004ff]/90 transition-all"
      >
        Create Project
      </button>
    </div>
  );
}
