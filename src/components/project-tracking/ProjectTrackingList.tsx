'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import CreateProjectForm from './CreateProjectForm';
import ProjectTrackingHeader from './list/ProjectTrackingHeader';
import ProjectTrackingStats from './list/ProjectTrackingStats';
import ProjectTrackingFilters from './list/ProjectTrackingFilters';
import ProjectTrackingCard from './list/ProjectTrackingCard';
import ProjectTrackingEmptyState from './list/ProjectTrackingEmptyState';

export default function ProjectTrackingList() {
  const { projects, openCreateModal } = useProjectTrackingContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return p.state === 'active' && matchesSearch;
    if (activeFilter === 'archive')
      return p.state === 'archive' && matchesSearch;
    if (activeFilter === 'my') return p.YourhwereAdded && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <CreateProjectForm />
      <ProjectTrackingHeader />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div className="relative w-full lg:w-80">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30"
            size={16}
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f9fafb] border border-[#0a0a0a]/5 rounded-xl pl-10 pr-4 py-2.5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="ml-auto lg:ml-0 bg-[#0004FF] text-white px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          New Project
        </button>

        
      </div>

      <ProjectTrackingStats projects={projects} />

      <ProjectTrackingFilters
        projects={projects}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredProjects.length === 0 ? (
        <ProjectTrackingEmptyState
          searchQuery={searchQuery}
          onCreateClick={openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectTrackingCard key={project._id} project={project} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-[#0a0a0a]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/30">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>
    </div>
  );
}
