'use client';

import { useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiFolder,
  FiFileText,
  FiCheckCircle,
} from 'react-icons/fi';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import NewProjectModal from './NewProjectModal';
import { ProjectType } from '@/types/code-edittor/projects/types';

type Status = 'All' | 'active' | 'finished';
type PropType = {
  projectsData: ProjectType[];
};

export default function ProjectList({ projectsData }: PropType) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Status>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ProjectData, setProjectData] = useState<ProjectType[]>(projectsData);

  const filteredProjects = ProjectData.filter((p: ProjectType) => {
    const matchesFilter = filter === 'All' || p.state === filter;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = ProjectData.filter(
    (p: ProjectType) => p.state === 'active'
  ).length;

  const finishedCount = ProjectData.filter(
    (p: ProjectType) => p.state === 'Finished'
  ).length;

  function handlecreate(project: ProjectType) {
    setIsModalOpen(false);
    setProjectData((prev) => [project, ...prev]);
  }

  return (
    <div className="max-w-6xl bg mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-px bg-[#0a0a0a]/20" />
          <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
            Projects
          </span>
        </div>
        <h1 className="font-['inter-bold'] text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#0a0a0a] mb-3">
          Your <span className="text-[#0004FF]">Projects</span>
        </h1>
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/50 leading-relaxed max-w-xl">
          Manage your codebase, track progress, and organize your development
          workflow all in one place.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div className="relative w-full lg:w-80">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
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

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 w-fit">
            {(['All', 'active', 'finished'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-4 py-2 rounded-lg text-xs font-['inter-semi'] transition-all duration-200 whitespace-nowrap ${
                  filter === f
                    ? 'bg-[#0a0a0a] text-white'
                    : 'text-black hover:text-[#0a0a0a]'
                }`}
              >
                {f === 'All' && (
                  <span
                    className={`mr-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      filter === f
                        ? 'bg-white/20 text-white'
                        : 'bg-[#0a0a0a]/5 text-white'
                    }`}
                  >
                    {ProjectData.length}
                  </span>
                )}
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto lg:ml-0 bg-[#0004FF] text-white px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2"
          >
            <FiPlus size={16} />
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0004FF] border border-[#ffff]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-white uppercase tracking-wider">
              Total
            </span>
            <FiFolder className="text-white/90" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-white tracking-tight">
            {ProjectData.length}
          </p>
        </div>

        <div className="group p-4 sm:p-5 rounded-xl text-white sm:rounded-2xl bg-[#0004FF] border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-white uppercase tracking-wider">
              Active
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-[#fff] tracking-tight">
            {activeCount}
          </p>
        </div>

        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0004FF] text-white border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-white uppercase tracking-wider">
              Finished
            </span>
            <FiCheckCircle className="text-white" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-[#fff] tracking-tight">
            {finishedCount}
          </p>
        </div>

        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0004FF] border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-white uppercase tracking-wider">
              Languages
            </span>
            <FiFileText className="text-[#fff]" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-[#fff] tracking-tight">
            {new Set(ProjectData.map((p) => p.language)).size}
          </p>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          onCreate={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={
                project._id
                  ? project._id.toString()
                  : Math.floor(Date.now() * Math.random())
              }
              project={project}
            />
          ))}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-[#0a0a0a]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-['inter-rag'] text-xs text-black">
          Showing {filteredProjects.length} of {ProjectData.length} projects
        </p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-xs text-black font-['inter-rag']">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {activeCount} active
          </span>
          <span className="flex items-center gap-2 text-xs text-black font-['inter-rag']">
            <span className="w-2 h-2 rounded-full bg-[#0a0a0a]/20" />
            {finishedCount} finished
          </span>
        </div>
      </div>

      {isModalOpen && (
        <NewProjectModal
          onCreate={handlecreate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}