'use client';

import {
  FiCheckCircle,
  FiClock,
  FiUser,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
  FiPaperclip,
} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TaskT } from '@/types/project tracking/types';

export type TaskState = 'not started' | 'in progress' | 'hold' | 'completed';

interface TaskCardProps {
  task: TaskT;
}

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
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function TaskCard({ task }: TaskCardProps) {
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

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className="group bg-white rounded-xl border border-[#0a0a0a]/5 hover:border-[#0004ff]/20 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03] transition-all duration-200 p-4 cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#f9fafb] border border-[#0a0a0a]/5">
            <FiCheckCircle size={10} className="text-[#0004ff]" />
            <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40">
              {task.taskId}
            </span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0a0a0a]/20 hover:text-[#0a0a0a]/40 p-1 rounded-md hover:bg-[#f9fafb]"
          >
            <FiMoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 z-10 bg-white rounded-xl border border-[#0a0a0a]/5 shadow-xl shadow-[#0a0a0a]/5 py-1.5 min-w-[140px] overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
              >
                <FiEdit2 size={12} className="text-[#0a0a0a]/30" />
                Edit Task
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-['inter-semi'] text-red-500 hover:bg-red-50 transition-colors"
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

      <div className="h-px bg-[#0a0a0a]/[0.03] mb-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 ${
              isOverdue ? 'text-red-400' : 'text-[#0a0a0a]/25'
            }`}
          >
            <FiClock size={10} className={isOverdue ? 'text-red-400' : ''} />
            <span
              className={`font-['inter-rag'] text-[9px] ${
                isOverdue ? 'text-red-400 font-medium' : ''
              }`}
            >
              {displayDate}
              {isOverdue && ' (overdue)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 text-black/40 "
            title={`Created by ${task.createdByUserName}`}
          >
            {task.createdByUserName}
          </div>

          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-['inter-semi']  ${getAvatarColor(task.createdByUserName)}`}
          >
            {task?.createdByUserImage ? (
              <Image
                src={task.createdByUserImage}
                alt={task.createdByUserName}
                width={10}
                height={10}
                className="w-4 h-4 rounded-full object-cover "
              />
            ) : (
              <p>{task.createdByUserName.charAt(0)}</p>
            )}
          </div>
        </div>

        {
          task.assignToMemberId ? 
          <div>

          </div>
          :
          null
        }

   
      </div>
    </div>
  );
}
