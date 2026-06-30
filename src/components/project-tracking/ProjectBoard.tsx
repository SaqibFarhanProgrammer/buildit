'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { TaskState } from '@/models/project traccking/task-tracking.models';
import { TaskT } from '@/types/project tracking/types';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import CreateNewTaskForm from './CreateNewTaskForm';
import BoardHeader from './board/BoardHeader';
import BoardColumn from './board/BoardColumn';
import TaskPreview from './TaskPreview';
import { BOARD_COLUMNS } from './utils';

// ─── Inline Toast ─────────────────────────────────────────────────────────────

type ToastData = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

let _toastId = 0;

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-xs font-['inter-semi'] border transition-all duration-300 ${
            t.type === 'success'
              ? 'bg-white border-emerald-200 text-[#0a0a0a]'
              : 'bg-white border-red-200 text-[#0a0a0a]'
          }`}
        >
          {t.type === 'success' ? (
            <FiCheckCircle size={14} className="text-emerald-500 shrink-0" />
          ) : (
            <FiAlertCircle size={14} className="text-red-500 shrink-0" />
          )}
          <span>{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="ml-1 text-[#0a0a0a]/30 hover:text-[#0a0a0a]/60 transition-colors"
          >
            <FiX size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── ProjectBoard ─────────────────────────────────────────────────────────────

type ProjectBoardProps = {
  tasks: TaskT[];
};

export default function ProjectBoard({
  tasks: initialTasks,
}: ProjectBoardProps) {
  const {
    currentProject,
    isTaskModalOpen,
    openEditTaskModal,
    isTaskPreviewOpen,
    previewTask,
    closeTaskPreview,
  } = useProjectTrackingContext();

  const [tasks, setTasks] = useState<TaskT[]>(initialTasks);
  const [movingTaskId, setMovingTaskId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const toastTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  // Keep local task list in sync when parent refreshes (e.g. after create/edit)
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  function showToast(type: 'success' | 'error', message: string) {
    const id = ++_toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    const timer = setTimeout(() => dismissToast(id), 4000);
    toastTimers.current.set(id, timer);
  }

  function dismissToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = toastTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.current.delete(id);
    }
  }

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
          Project not found
        </p>
      </div>
    );
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        `/api/projecttracking/delete-task?taskId=${taskId}&projectId=${currentProject._id}`
      );
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      showToast('success', 'Task deleted successfully');
    } catch (error) {
      console.error('DELETE_TASK_ERROR:', error);
      showToast('error', 'Failed to delete task');
    }
  };

  const handleMoveTask = async (task: TaskT, newState: TaskState) => {
    if (movingTaskId) return; // prevent concurrent moves

    setMovingTaskId(task._id);

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, state: newState } : t))
    );

    try {
      await axios.patch('/api/projecttracking/update-task', {
        taskId: task._id,
        projectId: currentProject._id,
        title: task.title,
        summary: task.summary,
        state: newState,
        assignToMemberId: task.assignToMemberId ?? undefined,
        dueDate: task.dueDate ?? undefined,
      });

      const columnLabel =
        BOARD_COLUMNS.find((c) => c.id === newState)?.label ?? newState;
      showToast('success', `Task moved to ${columnLabel}`);
    } catch (error) {
      console.error('MOVE_TASK_ERROR:', error);
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, state: task.state } : t))
      );
      showToast('error', 'Failed to move task. Please try again.');
    } finally {
      setMovingTaskId(null);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {isTaskModalOpen && <CreateNewTaskForm />}

      {isTaskPreviewOpen && previewTask && (
        <TaskPreview
          isOpen={isTaskPreviewOpen}
          task={previewTask}
          onClose={closeTaskPreview}
          onEdit={() => {
            closeTaskPreview();
            openEditTaskModal(previewTask);
          }}
        />
      )}

      <BoardHeader title={currentProject.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {BOARD_COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            tasks={tasks}
            column={column}
            movingTaskId={movingTaskId}
            onEditTask={openEditTaskModal}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
          />
        ))}
      </div>
    </div>
  );
}
