'use client';

import { FiX, FiFolder, FiUsers, FiAlignLeft, FiCheckCircle, FiPlus } from 'react-icons/fi';


export default function CreateProjectModal() {

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-[#0004ff]/10 text-[#0004ff]',
      'bg-emerald-100 text-emerald-600',
      'bg-amber-100 text-amber-600',
      'bg-rose-100 text-rose-600',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const members = [
    { id: 'user_1', name: 'Ali Huzaifa' },
    { id: 'user_2', name: 'Saqib Farhan' },
    { id: 'user_3', name: 'Muhammad Usman' },
    { id: 'user_4', name: 'Umer Farooq' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0a0a0a]/5">
          <div>
            <h2 className="font-['inter-bold'] text-lg text-[#0a0a0a]">
              Create Project
            </h2>
            <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-0.5">
              Start a new project and invite your team
            </p>
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-[#f9fafb] flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Project Title */}
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Project Name
            </label>
            <div className="relative">
              <FiFolder
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/20"
              />
              <input
                type="text"
                placeholder="Enter project name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Description
            </label>
            <div className="relative">
              <FiAlignLeft
                size={14}
                className="absolute left-3 top-3 text-[#0a0a0a]/20"
              />
              <textarea
                rows={3}
                placeholder="Describe your project..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Add Members
            </label>
            <div className="grid grid-cols-2 gap-2">
              {members.map((member) => (
                <button
                  key={member.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 hover:border-[#0004ff]/20 hover:bg-white transition-all text-left"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(member.name)}`}
                  >
                    {getInitials(member.name)}
                  </div>
                  <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/60 truncate">
                    {member.name}
                  </span>
                  <div className="ml-auto w-4 h-4 rounded-full border-2 border-[#0a0a0a]/10 flex items-center justify-center">
                    <FiPlus size={10} className="text-[#0a0a0a]/20" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Invite by Email */}
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Invite by Email
            </label>
            <div className="relative">
              <FiUsers
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/20"
              />
              <input
                type="email"
                placeholder="Enter email address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Project Status */}
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Initial Status
            </label>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-['inter-semi'] bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                Active
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-['inter-semi'] bg-[#0a0a0a]/5 text-[#0a0a0a]/30 border border-[#0a0a0a]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/20 mr-2" />
                Archive
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#0a0a0a]/5">
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all"
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2">
            <FiCheckCircle size={14} />
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}