'use client';

import { ITaskCard, TaskT } from '@/types/project tracking/types';
import {
  FiCheckCircle,
  FiClock,
  FiUser,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { getAvatarColor, getInitials } from '../utils';

type Props = {
  task: ITaskCard;
  onEdit: (task: ITaskCard) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : task.createdAt
      ? new Date(task.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      : 'No date';

  return (
    <div
      className="group bg-white rounded-xl border border-[#0a0a0a]/5 border-[#0004ff]/20 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03] transition-all duration-200 p-4 cursor-pointer"
      onClick={() => onEdit(task)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#0004ff]/10 flex items-center justify-center">
            <FiCheckCircle size={10} className="text-[#0004ff]" />
          </div>
          <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30">
            {task.taskId}
          </span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0a0a0a]/20 hover:text-[#0a0a0a]/40"
          >
            <FiMoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 z-10 bg-white rounded-lg border border-[#0a0a0a]/5 shadow-lg py-1 min-w-[120px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onEdit(task);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-['inter-rag'] text-[#0a0a0a]/60 hover:bg-[#f9fafb]"
              >
                <FiEdit2 size={12} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onDelete(task.taskId);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-['inter-rag'] text-red-500 hover:bg-red-50"
              >
                <FiTrash2 size={12} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h4 className="font-['inter-semi'] text-sm text-[#0a0a0a] mb-2 leading-snug group-hover:text-[#0004ff] transition-colors">
        {task.title}
      </h4>

      {task.summary && (
        <p className="font-['inter-rag'] text-[11px] text-[#0a0a0a]/35 leading-relaxed mb-3 line-clamp-2">
          {task.summary}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-[#0a0a0a]/[0.03]">
        <div className="flex items-center gap-1.5">
          <FiClock size={10} className="text-[#0a0a0a]/20" />
          <span className="font-['inter-rag'] text-[9px] text-[#0a0a0a]/25">
            {displayDate}
          </span>
        </div>

        {task.assignToMemberId ? (
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-['inter-semi'] ${getAvatarColor(task.assignToMemberName)}`}
            title={task.assignToMemberId}
          >
            {getInitials(task.assignToMemberId)}
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-[#f9fafb] border border-dashed border-[#0a0a0a]/10 flex items-center justify-center">
            <FiUser size={10} className="text-[#0a0a0a]/15" />
          </div>
        )}
      </div>
    </div>
  );
}
