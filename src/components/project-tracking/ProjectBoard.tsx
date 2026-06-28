'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { TaskT } from '@/types/project tracking/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CreateNewTaskForm from './CreateNewTaskForm';
import BoardHeader from './board/BoardHeader';
import BoardColumn from './board/BoardColumn';
import TaskPreview from './TaskPreview';
import { BOARD_COLUMNS } from './utils';

type ProjectBoardProps = {
  tasks: TaskT[];
};

export default function ProjectBoard({ tasks }: ProjectBoardProps) {
  const router = useRouter();
  const {
    currentProject,
    isTaskModalOpen,
    openEditTaskModal,
    isTaskPreviewOpen,
    previewTask,
    closeTaskPreview,
  } = useProjectTrackingContext();

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
      router.refresh();
    } catch (error) {
      console.error('DELETE_TASK_ERROR:', error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 sm:py-12">
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
            onEditTask={openEditTaskModal}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
