'use client';

import { useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiFolder,
  FiFileText,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import NewProjectModal from './NewProjectModal';
import { ProjectType } from '@/types/code-edittor/projects/projects.types';
import { useProjectContext } from '@/context/Project.context';
import Cookies from 'js-cookie';

type Status = 'All' | 'Active' | 'Finished';

export default function ProjectList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Status>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = useProjectContext();
  const userToken = Cookies.get('token');

  console.log(userToken);

  const filteredProjects = projects.filter((p: ProjectType) => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = filteredProjects.filter(
    (p: ProjectType) => p.status === 'Active'
  ).length;
  const finishedCount = filteredProjects.filter(
    (p: ProjectType) => p.status === 'Finished'
  ).length;

  function handlecreate() {
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="mb-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="font-['inter-semi'] text-xs tracking-[0.2em] text-white/40 uppercase">
            Projects
          </span>
        </div>
        <h1 className="font-['inter'] text-4xl sm:text-5xl text-white mb-3">
          Your <span className="text-[#0004FF]">Projects</span>
        </h1>
        <p className="font-['inter-rag'] text-base text-white/40 max-w-xl">
          Manage your codebase, track progress, and organize your development
          workflow all in one place.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            size={16}
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm font-['inter-rag'] text-white placeholder:text-white/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white/[0.05] transition-all"
          />
        </div>

        {/* Filter + New */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl p-1">
            {(['All', 'Active', 'Finished'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-['inter-semi'] transition-all ${
                  filter === f
                    ? 'bg-[#0004FF] text-white shadow-lg shadow-[#0004FF]/20'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.05]'
                }`}
              >
                {f === 'All' && (
                  <span className="mr-1.5">{projects.length}</span>
                )}
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto lg:ml-0 bg-[#0004FF] text-white px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2 shadow-lg shadow-[#0004FF]/20"
          >
            <FiPlus size={16} />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-semi'] text-[10px] tracking-wider text-white/30 uppercase">
              Total
            </span>
            <FiFolder className="text-[#0004FF]" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl text-white">
            {projects.length}
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-semi'] text-[10px] tracking-wider text-white/30 uppercase">
              Active
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="font-['inter-bold'] text-2xl text-white">
            {activeCount}
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-semi'] text-[10px] tracking-wider text-white/30 uppercase">
              Finished
            </span>
            <FiCheckCircle className="text-white/30" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl text-white">
            {finishedCount}
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-semi'] text-[10px] tracking-wider text-white/30 uppercase">
              Languages
            </span>
            <FiFileText className="text-[#0004FF]" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl text-white">
            {new Set(projects.map((p) => p.language)).size}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          onCreate={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-['inter-rag'] text-xs text-white/20">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-xs text-white/30 font-['inter-rag']">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {activeCount} active
          </span>
          <span className="flex items-center gap-2 text-xs text-white/30 font-['inter-rag']">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            {finishedCount} finished
          </span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <NewProjectModal
          onCreate={handlecreate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
