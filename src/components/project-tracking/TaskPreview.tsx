'use client';

import { TaskState } from '@/models/project traccking/task-tracking.models';
import { TaskT } from '@/types/project tracking/types';
import {
  FiX,
  FiClock,
  FiUser,
  FiCalendar,
  FiAlignLeft,
  FiEdit2,
} from 'react-icons/fi';
import {
  findMemberById,
  formatTaskDate,
  getAvatarColor,
  getInitials,
  isTaskOverdue,
} from './utils';
import { useProjectTrackingContext } from '@/context/ProjectTracking.context';

interface TaskPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  task: TaskT;
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

function PersonBlock({
  name,
  image,
  subtitle,
}: {
  name: string;
  image?: string | null;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-7 h-7 rounded-full object-cover"
        />
      ) : (
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(name)}`}
        >
          {getInitials(name)}
        </div>
      )}
      <div>
        <span className="font-['inter-semi'] text-sm text-[#0a0a0a] block">
          {name}
        </span>
        {subtitle && (
          <span className="font-['inter-rag'] text-[10px] text-[#0a0a0a]/30">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TaskPreview({
  isOpen,
  onClose,
  onEdit,
  task,
}: TaskPreviewProps) {
  const { members, currentUserRole } = useProjectTrackingContext();

  if (!isOpen) return null;

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
  const overdue = isTaskOverdue(task.dueDate);
  const assignee = findMemberById(members, task.assignToMemberId);
  const canManage = currentUserRole !== 'viewer';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative hide-scrollBar w-full max-w-4xl bg-white rounded-2xl border border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 sm:px-8 py-6 border-b border-[#0a0a0a]/5">
          <div className="flex-1 pr-8">
            <div className="flex items-center gap-3 mb-3">
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

        <div className="px-6 sm:px-8 py-6">
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
                  {task.summary || 'No summary provided.'}
                </p>
              </div>

              <div className="h-px bg-[#0a0a0a]/[0.03]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser size={12} className="text-[#0a0a0a]/30" />
                    <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                      Created By
                    </span>
                  </div>
                  <PersonBlock
                    name={task.createdByUserName}
                    image={task.createdByUserImage}
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser size={12} className="text-[#0a0a0a]/30" />
                    <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                      Assigned To
                    </span>
                  </div>
                  {assignee ? (
                    <PersonBlock name={assignee.name} image={assignee.image} />
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
                      className={overdue ? 'text-red-400' : 'text-[#0a0a0a]/30'}
                    />
                    <span
                      className={`font-['inter-semi'] text-[10px] uppercase tracking-wider ${overdue ? 'text-red-400' : 'text-[#0a0a0a]/30'}`}
                    >
                      Due Date
                    </span>
                  </div>
                  {dueDate ? (
                    <span
                      className={`font-['inter-semi'] text-sm ${overdue ? 'text-red-500' : 'text-[#0a0a0a]'}`}
                    >
                      {dueDate}
                      {overdue && ' (Overdue)'}
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
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 shrink-0">
                      Short ID
                    </span>
                    <span className="font-['inter-semi'] text-xs text-[#0a0a0a] font-mono truncate">
                      {task._id.slice(0, 10)}...
                    </span>
                  </div>
                  <div className="h-px bg-[#0a0a0a]/[0.03]" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 shrink-0">
                      Display Date
                    </span>
                    <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/60">
                      {formatTaskDate(task.dueDate, task.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#f9fafb] border border-[#0a0a0a]/5">
                <h3 className="font-['inter-semi'] text-xs text-[#0a0a0a]/40 uppercase tracking-wider mb-3">
                  Created By
                </h3>
                <PersonBlock
                  name={task.createdByUserName}
                  image={task.createdByUserImage}
                  subtitle={createdDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-5 border-t border-[#0a0a0a]/5">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all"
          >
            Close
          </button>
          {canManage && (
            <button
              onClick={onEdit}
              className="px-6 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2"
            >
              <FiEdit2 size={14} />
              Edit Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
