'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiFolder, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import { ProjectTrackingT } from '@/types/project tracking/types';
import CreateProjectModal from './CreateProjectForm';

// Types

type PropType = {
  projectsData: ProjectTrackingT[];
};


const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'active', label: 'Active' },
  { id: 'archive', label: 'Archived' },
  { id: 'my', label: 'My Projects' },
];

export default function ProjectTrackingList({ projectsData }: PropType) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return p.state === 'active' && matchesSearch;
    if (activeFilter === 'archive') return p.state === 'archive' && matchesSearch;
    if (activeFilter === 'my') return p.YourhwereAdded && matchesSearch;
    return matchesSearch;
  });

  const activeCount = projectsData.filter((p) => p.state === 'active').length;
  const archiveCount = projectsData.filter((p) => p.state === 'archive').length;
  const myCount = projectsData.filter((p) => p.YourhwereAdded).length;
  const totalTasks = projectsData.reduce((acc, p) => acc + p.tasks.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <CreateProjectModal/>
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-px bg-[#0a0a0a]/20" />
          <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
            Project Tracking
          </span>
        </div>
        <h1 className="font-['inter-bold'] text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#0a0a0a] mb-3">
          Your <span className="text-[#0004FF]">Projects</span>
        </h1>
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/50 leading-relaxed max-w-xl">
          Manage project tasks, track progress across teams, and stay organized with your development workflow.
        </p>
      </div>

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

        <button className="ml-auto lg:ml-0 bg-[#0004FF] text-white px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2">
          <FiPlus size={16} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0004FF] border border-white/5 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-white/90 uppercase tracking-wider">
              Total Projects
            </span>
            <FiFolder className="text-white/90" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-white tracking-tight">
            {projectsData.length}
          </p>
        </div>

        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
              Active
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-[#0a0a0a] tracking-tight">
            {activeCount}
          </p>
        </div>

        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
              Total Tasks
            </span>
            <FiCheckCircle className="text-[#0a0a0a]/30" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-[#0a0a0a] tracking-tight">
            {totalTasks}
          </p>
        </div>

        <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
              My Projects
            </span>
            <FiUsers className="text-[#0004FF]" size={16} />
          </div>
          <p className="font-['inter-bold'] text-2xl sm:text-3xl text-[#0a0a0a] tracking-tight">
            {myCount}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 w-fit mb-8 sm:mb-10 overflow-x-auto">
        {filters.map((filter) => {
          const counts: Record<string, number> = {
            all: projectsData.length,
            active: activeCount,
            archive: archiveCount,
            my: myCount,
          };
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
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
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
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
          <button className="bg-[#0004ff] text-white px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] hover:bg-[#0004ff]/90 transition-all">
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project._id}`}
              className="block"
            >
              <div className="group relative p-5 rounded-xl bg-white border border-[#0a0a0a]/5 hover:border-[#0004ff]/30 hover:bg-[#f9fafb] transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-[10px] font-['inter-semi'] px-2 py-1 rounded-md border ${
                      project.state === 'active'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30 border-[#0a0a0a]/5'
                    }`}
                  >
                    {project.state}
                  </span>
                </div>

                {project.IsAdmin && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-['inter-semi'] bg-[#0004ff]/5 text-[#0004ff] border border-[#0004ff]/10">
                      Admin
                    </span>
                  </div>
                )}

                <h3 className="font-['inter-semi'] text-base text-[#0a0a0a] mb-1.5 group-hover:text-[#0004ff] transition-colors pr-20">
                  {project.title}
                </h3>

                <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-3 border-t border-[#0a0a0a]/5">
                  <span className="flex items-center gap-1.5 text-[10px] text-[#0a0a0a]/30 font-['inter-rag']">
                    <FiCheckCircle size={12} />
                    {project.tasks.length} tasks
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-[#0a0a0a]/30 font-['inter-rag']">
                    <FiUsers size={12} />
                    {project.members.length} members
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  {project.createdByUserImage ? (
                    <img
                      src={project.createdByUserImage}
                      alt={project.createdByUserName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#0004ff]/10 flex items-center justify-center">
                      <span className="text-[8px] font-['inter-semi'] text-[#0004ff]">
                        {project.createdByUserName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="font-['inter-rag'] text-[10px] text-[#0a0a0a]/30">
                    {project.createdByUserName}
                  </span>
                </div>

                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#0004ff] text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-[#0a0a0a]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/30">
          Showing {filteredProjects.length} of {projectsData.length} projects
        </p>
      </div>
    </div>
  );
}