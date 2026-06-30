'use client';

import {
  FiCheckCircle,
  FiClock,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TaskCardData } from '../utils';
import { TaskState } from '@/models/project traccking/task-tracking.models';
import MoveTaskMenu from './MoveTaskMenu';

interface TaskCardProps {
  task: TaskCardData;
  currentState: TaskState;
  canManage: boolean;
  isMoving: boolean;
  onPreview: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMove?: (newState: TaskState) => Promise<void>;
}

function PersonAvatar({
  person,
  size = 'sm',
}: {
  person: TaskCardData['creator'];
  size?: 'sm' | 'md';
}) {
  const sizeClass =
    size === 'sm' ? 'w-4 h-4 text-[6px]' : 'w-7 h-7 text-[10px]';

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-['inter-semi'] shrink-0 ${person.avatarColor}`}
      title={person.name}
    >
      {person.image ? (
        <Image
          src={person.image}
          alt={person.name}
          width={size === 'sm' ? 16 : 28}
          height={size === 'sm' ? 16 : 28}
          className={`${sizeClass} rounded-full object-cover`}
        />
      ) : (
        <span>{person.initial}</span>
      )}
    </div>
  );
}

export default function TaskCard({
  task,
  currentState,
  canManage,
  isMoving,
  onPreview,
  onEdit,
  onDelete,
  onMove,
}: TaskCardProps) {
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

  return (
    <div
      onClick={onPreview}
      className={`group bg-white rounded-xl border border-[#0a0a0a]/5 hover:border-[#0004ff]/20 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03] transition-all duration-200 p-4 cursor-pointer ${isMoving ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#f9fafb] border border-[#0a0a0a]/5">
            <FiCheckCircle size={10} className="text-[#0004ff]" />
          </div>
        </div>
        {canManage && (
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
              <div className="absolute right-0 top-7 z-10 bg-white rounded-xl border border-[#0a0a0a]/5 shadow-xl shadow-[#0a0a0a]/5 py-1.5 min-w-[140px] overflow-visible">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onEdit?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
                >
                  <FiEdit2 size={12} className="text-[#0a0a0a]/30" />
                  Edit Task
                </button>

                {onMove && (
                  <MoveTaskMenu
                    currentState={currentState}
                    isDisabled={isMoving}
                    onMove={async (newState) => {
                      setMenuOpen(false);
                      await onMove(newState);
                    }}
                  />
                )}

                <div className="h-px bg-[#0a0a0a]/[0.03] my-1" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onDelete?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-['inter-semi'] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
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

      <div className="flex items-center justify-between gap-2">
        <div
          className={`flex items-center gap-1.5 shrink-0 ${
            task.isOverdue ? 'text-red-400' : 'text-[#0a0a0a]/25'
          }`}
        >
          <FiClock size={10} />
          <span
            className={`font-['inter-rag'] text-[9px] ${
              task.isOverdue ? 'text-red-400 font-medium' : ''
            }`}
          >
            {task.displayDate}
            {task.isOverdue && ' (overdue)'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="font-['inter-rag'] text-[9px] text-[#0a0a0a]/35 truncate max-w-[60px]"
            title={`Created by ${task.creator.name}`}
          >
            {task.creator.name}
          </span>
          <PersonAvatar person={task.creator} />

          {task.assignee && (
            <>
              <span className="text-[#0a0a0a]/20 text-[9px]">→</span>
              <PersonAvatar person={task.assignee} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
