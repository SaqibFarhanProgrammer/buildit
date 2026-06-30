'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronRight, FiLoader } from 'react-icons/fi';
import { BOARD_COLUMNS } from '../utils';
import { TaskState } from '@/models/project traccking/task-tracking.models';

interface MoveTaskMenuProps {
  currentState: TaskState;
  isDisabled: boolean;
  onMove: (newState: TaskState) => void;
}

export default function MoveTaskMenu({
  currentState,
  isDisabled,
  onMove,
}: MoveTaskMenuProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [movingTo, setMovingTo] = useState<TaskState | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const otherColumns = BOARD_COLUMNS.filter((col) => col.id !== currentState);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(e.target as Node)
      ) {
        setSubmenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSelect(e: React.MouseEvent, newState: TaskState) {
    e.stopPropagation();
    if (isDisabled || movingTo) return;
    setMovingTo(newState);
    await onMove(newState);
    setMovingTo(null);
    setSubmenuOpen(false);
  }

  return (
    <div className="relative" ref={submenuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) setSubmenuOpen((prev) => !prev);
        }}
        disabled={isDisabled}
        className="w-full flex items-center justify-between gap-2.5 px-3.5 py-2 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span>Move To</span>
        <FiChevronRight size={12} className="text-[#0a0a0a]/30" />
      </button>

      {submenuOpen && (
        <div className="absolute right-full top-0 mr-1 z-20 bg-white rounded-xl border border-[#0a0a0a]/5 shadow-xl shadow-[#0a0a0a]/5 py-1.5 min-w-[130px] overflow-hidden">
          {otherColumns.map((col) => {
            const isMovingThis = movingTo === col.id;
            return (
              <button
                key={col.id}
                onClick={(e) => handleSelect(e, col.id)}
                disabled={!!movingTo}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${col.dotColor} shrink-0`}
                />
                {col.label}
                {isMovingThis && (
                  <FiLoader
                    size={10}
                    className="ml-auto text-[#0004ff] animate-spin"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
