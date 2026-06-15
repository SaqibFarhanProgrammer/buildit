'use client';

import { ProjectTrackingT } from '@/types/project tracking/types';
import { FiCheckCircle, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

type Props = {
  project: ProjectTrackingT;
};

export default function ProjectTrackingCard({ project }: Props) {
  return (
    <Link href={`/projectmanage/${project._id}`} className="block">
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
  );
}
