'use client';

import { TaskT } from '@/types/project tracking/types';
import { FiPlus } from 'react-icons/fi';
import { BOARD_COLUMNS } from '../utils';
import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import TaskCard from './TaskCard';
import { useState } from 'react';
import TaskPreview from '../TaskPreview';

type ColumnConfig = (typeof BOARD_COLUMNS)[number];

type Props = {
  column: ColumnConfig;
  tasks: TaskT[];
  isAdmin: string;
  onEditTask: (task: TaskT) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function BoardColumn({ column, isAdmin, tasks }: Props) {
  const { openCreateTaskModal } = useProjectTrackingContext();
  const [isTaskPreviewOpen, setisTaskPreviewOpen] = useState(false);
  const [TaskDetiales, setTaskDetiales] = useState<TaskT>();

  function HandleTaskPreview(task: TaskT) {
    setisTaskPreviewOpen(true);
    setTaskDetiales(task);
  }

  return (
    <div className="flex flex-col">
      {isTaskPreviewOpen && (
        <TaskPreview
          onClose={() => setisTaskPreviewOpen(false)}
          isOpen={isTaskPreviewOpen}
          task={TaskDetiales!}
          isAdmin={isAdmin}
        />
      )}

      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dotColor}`} />
          <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider">
            {column.label}
          </span>
        </div>
        <span
          className={`font-['inter-semi'] text-[10px] px-2 py-0.5 rounded-md ${column.badgeColor}`}
        >
          5
        </span>
      </div>

      <div
        className={`flex-1 rounded-2xl border-2 border-${column.color}/50  p-3 overflow-y-scroll hide-scrollBar ${column.color} max-h-[500px]`}
      >
        <div className="space-y-3">
          {tasks
            .filter((task) => task.state === column.id)
            .map((task, i) => (
              <TaskCard
              isAdmin={isAdmin}
                handletaskpreview={HandleTaskPreview}
                key={i}
                task={task}
              />
            ))}
        </div>

        {isAdmin === 'admin' || isAdmin === 'member' ? (
          <button
            onClick={() => {
              openCreateTaskModal(column.id);
            }}
            className="w-full mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/50 border border-dashed border-[#0a0a0a]/10 hover:border-[#0004ff]/30 hover:bg-white transition-all group"
          >
            <FiPlus
              size={14}
              className="text-[#0a0a0a]/20 group-hover:text-[#0004ff] transition-colors"
            />
            <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/30 group-hover:text-[#0004ff] transition-colors">
              Create
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
