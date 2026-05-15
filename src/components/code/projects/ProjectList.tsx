'use client';

import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import NewProjectModal from './NewProjectModal';
import { ProjectType } from '@/types/code-edittor/projects/projects.types';

type Status = 'All' | 'Active' | 'Finished';

export default function ProjectList({
  initialProjects,
}: {
  initialProjects: ProjectType[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Status>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const FilterProjects = initialProjects.filter((p) => {
    const matchesFilter = filter === 'All' || p.status === filter;

    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-['inter-bold'] text-3xl sm:text-4xl text-white mb-2">
          Your Projects
        </h1>
        <p className="font-['inter-rag'] text-sm text-white/40">
          {FilterProjects.length} projects — manage your code
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex items-center gap-2">
          {(['All', 'Active', 'Finished'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-['inter-semi'] transition-all ${
                filter === f
                  ? 'bg-[#0004ff] text-white'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="sm:ml-auto bg-[#0004ff] text-white px-4 py-2 rounded-lg text-sm font-['inter-semi'] hover:bg-[#0004ff]/90 transition-all flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span>
          New Project
        </button>
      </div>

      {FilterProjects.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          onCreate={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FilterProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
        <p className="font-['inter-rag'] text-xs text-white/20">
          Showing {FilterProjects.length} of {FilterProjects.length} projects
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-white/20 font-['inter-rag']">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {FilterProjects.filter((p) => p.status === 'Active').length} active
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/20 font-['inter-rag']">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            {FilterProjects.filter((p) => p.status === 'Finished').length}{' '}
            Finshed
          </span>
        </div>
      </div>

      {isModalOpen && (
        <NewProjectModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}
