'use client';

import { TaskState } from '@/models/project traccking/task-tracking.models';
import { TaskT } from '@/types/project tracking/types';
import {
  FiX,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiCalendar,
  FiFlag,
  FiAlignLeft,
  FiHash,
  FiLayers,
  FiActivity,
  FiEdit2,
} from 'react-icons/fi';

interface TaskPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskT | null;
}

const stateConfig: Record<
  TaskState,
  { label: string; color: string; dot: string }
> = {
  'TO DO': {
    label: 'Not Started',
    color: 'bg-[#0a0a0a]/5 text-[#0a0a0a]/50 border-[#0a0a0a]/10',
    dot: 'bg-[#0a0a0a]/20',
  },
  'IN PROGRESS': {
    label: 'In Progress',
    color: 'bg-[#0004ff]/5 text-[#0004ff] border-[#0004ff]/10',
    dot: 'bg-[#0004ff]',
  },
  HOLD: {
    label: 'Hold',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    dot: 'bg-amber-500',
  },
  DONE: {
    label: 'Completed',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    dot: 'bg-emerald-500',
  },
};

function getInitials(name?: string) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name?: string) {
  if (!name) return 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30';
  const colors = [
    'bg-[#0004ff]/10 text-[#0004ff]',
    'bg-emerald-100 text-emerald-600',
    'bg-amber-100 text-amber-600',
    'bg-rose-100 text-rose-600',
    'bg-purple-100 text-purple-600',
    'bg-cyan-100 text-cyan-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function TaskPreview({
  isOpen,
  onClose,
  task,
}: TaskPreviewProps) {
  if (!isOpen || !task) return null;
  const config = stateConfig[task.state];
  const createdDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown';
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-[70%] max-w-4xl bg-white rounded-2xl border border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-8 py-6 border-b border-[#0a0a0a]/5">
          <div className="flex-1 pr-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f9fafb] border border-[#0a0a0a]/5">
                <FiHash size={10} className="text-[#0004ff]" />
                <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40">
                  {task.taskId}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-['inter-semi'] border ${config.color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                {config.label}
              </span>
            </div>

            <h2 className="font-['inter-bold'] text-xl sm:text-2xl text-[#0a0a0a] tracking-tight">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#f9fafb] flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all shrink-0"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiAlignLeft size={14} className="text-[#0a0a0a]/30" />
                  <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                    Summary
                  </span>
                </div>
                <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/60 leading-relaxed">
                  {task.summary}
                </p>
              </div>

              <div className="h-px bg-[#0a0a0a]/[0.03]" />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser size={12} className="text-[#0a0a0a]/30" />
                    <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                      Created By
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.createdByUserImage ? (
                      <img
                        src={task.createdByUserImage}
                        alt={task.createdByUserName}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(task.createdByUserName)}`}
                      >
                        {getInitials(task.createdByUserName)}
                      </div>
                    )}
                    <span className="font-['inter-semi'] text-sm text-[#0a0a0a]">
                      {task.createdByUserName}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser size={12} className="text-[#0a0a0a]/30" />
                    <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                      Assigned To
                    </span>
                  </div>
                  {task.assignToMemberId ? (
                    <div className="flex items-center gap-2">
                      {task.assignToMemberImage ? (
                        <img
                          src={task.assignToMemberImage}
                          alt={task.assignToMemberName || ''}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(task.assignToMemberName || task.assignToMemberId)}`}
                        >
                          {getInitials(
                            task.assignToMemberName || task.assignToMemberId
                          )}
                        </div>
                      )}
                      <span className="font-['inter-semi'] text-sm text-[#0a0a0a]">
                        {task.assignToMemberName || task.assignToMemberId}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#f9fafb] border border-dashed border-[#0a0a0a]/10 flex items-center justify-center">
                        <FiUser size={12} className="text-[#0a0a0a]/20" />
                      </div>
                      <span className="font-['inter-rag'] text-sm text-[#0a0a0a]/30">
                        Unassigned
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCalendar size={12} className="text-[#0a0a0a]/30" />
                    <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                      Created Date
                    </span>
                  </div>
                  <span className="font-['inter-semi'] text-sm text-[#0a0a0a]">
                    {createdDate}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock
                      size={12}
                      className={
                        isOverdue ? 'text-red-400' : 'text-[#0a0a0a]/30'
                      }
                    />
                    <span
                      className={`font-['inter-semi'] text-[10px] uppercase tracking-wider ${isOverdue ? 'text-red-400' : 'text-[#0a0a0a]/30'}`}
                    >
                      Due Date
                    </span>
                  </div>
                  {dueDate ? (
                    <span
                      className={`font-['inter-semi'] text-sm ${isOverdue ? 'text-red-500' : 'text-[#0a0a0a]'}`}
                    >
                      {dueDate}
                      {isOverdue && ' (Overdue)'}
                    </span>
                  ) : (
                    <span className="font-['inter-rag'] text-sm text-[#0a0a0a]/30">
                      No due date
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                <h3 className="font-['inter-semi'] text-xs text-[#0a0a0a]/40 uppercase tracking-wider mb-4">
                  Task Info
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
                      Task ID
                    </span>
                    <span className="font-['inter-semi'] text-xs text-[#0a0a0a]">
                      {task._id.split('').slice(0, 10)} {'....'}
                    </span>
                  </div>
                  <div className="h-px bg-[#0a0a0a]/[0.03]" />
                  <div className="flex items-center justify-between">
                    <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-['inter-semi'] border ${config.color}`}
                    >
                      <span className={`w-1 h-1 rounded-full ${config.dot}`} />
                      {config.label}
                    </span>
                  </div>
                  <div className="h-px bg-[#0a0a0a]/[0.03]" />
                  <div className="flex items-center justify-between">
                    <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
                      Project ID
                    </span>
                    <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 font-mono">
                      {task.projectid}
                    </span>
                  </div>
                  <div className="h-px bg-[#0a0a0a]/[0.03]" />
                  <div className="flex items-center justify-between">
                    <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
                      Task ID
                    </span>
                    <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 font-mono">
                      {task._id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                <h3 className="font-['inter-semi'] text-xs text-[#0a0a0a]/40 uppercase tracking-wider mb-3">
                  Created By
                </h3>
                <div className="flex items-center gap-3">
                  {task.createdByUserImage ? (
                    <img
                      src={task.createdByUserImage}
                      alt={task.createdByUserName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-['inter-semi'] ${getAvatarColor(task.createdByUserName)}`}
                    >
                      {getInitials(task.createdByUserName)}
                    </div>
                  )}
                  <div>
                    <span className="font-['inter-semi'] text-sm text-[#0a0a0a] block">
                      {task.createdByUserName}
                    </span>
                    <span className="font-['inter-rag'] text-[10px] text-[#0a0a0a]/30">
                      {createdDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-[#0a0a0a]/5">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all"
          >
            Close
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2">
            <FiEdit2 size={14} />
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}
