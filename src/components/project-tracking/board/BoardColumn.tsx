'use client';

import { TaskState, TaskT } from '@/types/project tracking/types';
import { FiPlus } from 'react-icons/fi';
import TaskCard from './TaskCard';
import { BOARD_COLUMNS } from '../utils';

type ColumnConfig = (typeof BOARD_COLUMNS)[number];

type Props = {
  column: ColumnConfig;
  tasks: TaskT[];
  isAdmin: boolean;
  onCreateTask: (columnId: TaskState) => void;
  onEditTask: (task: TaskT) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function BoardColumn({
  column,
  tasks,
  isAdmin,
  onCreateTask,
  onEditTask,
  onDeleteTask,
}: Props) {
  return (
    <div className="flex flex-col">
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
          {tasks.length}
        </span>
      </div>

      <div className={`flex-1 rounded-2xl p-3 ${column.color} min-h-[400px]`}>
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/20">
              No tasks
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        )}

        {isAdmin && (
          <button
            onClick={() => onCreateTask(column.id)}
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
        )}
      </div>
    </div>
  );
}
