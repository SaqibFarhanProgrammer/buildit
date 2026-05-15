'use client';

interface EmptyStateProps {
  searchQuery: string;
  onCreate: () => void;
}

export default function EmptyState({ searchQuery, onCreate }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-white/20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-['inter-semi'] text-lg text-white/60 mb-2">
        {searchQuery ? 'No projects found' : 'No projects yet'}
      </h3>
      <p className="font-['inter-rag'] text-sm text-white/30 mb-6 text-center max-w-sm">
        {searchQuery
          ? `No projects match "${searchQuery}". Try a different search.`
          : 'Create your first project to start coding with AI.'}
      </p>
      <button
        onClick={onCreate}
        className="bg-[#0004ff] text-white px-5 py-2.5 rounded-lg text-sm font-['inter-semi'] hover:bg-[#0004ff]/90 transition-all"
      >
        Create Project
      </button>
    </div>
  );
}
