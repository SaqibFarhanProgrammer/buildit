'use client';

import { ProjectTrackingT } from '@/types/project tracking/types';
import { FiFolder, FiUsers, FiCheckCircle } from 'react-icons/fi';

type Props = {
  projects: ProjectTrackingT[];
};

export default function ProjectTrackingStats({ projects }: Props) {
  const activeCount = projects.filter((p) => p.state === 'active').length;
  const myCount = projects.filter((p) => p.YourhwereAdded).length;
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0004FF] border border-white/5 hover:shadow-lg hover:shadow-[#0a0a0a]/3 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <span className="font-['inter-light'] text-[10px] text-white/90 uppercase tracking-wider">
            Total Projects
          </span>
          <FiFolder className="text-white/90" size={16} />
        </div>
        <p className="font-['inter-bold'] text-2xl sm:text-3xl text-white tracking-tight">
          {projects.length}
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
  );
}
