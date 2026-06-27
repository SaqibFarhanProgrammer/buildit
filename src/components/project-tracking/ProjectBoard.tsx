'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { MemberDetailType, TaskT } from '@/types/project tracking/types';
import axios from 'axios';
import CreateNewTaskForm from './CreateNewTaskForm';
import BoardHeader from './board/BoardHeader';
import BoardColumn from './board/BoardColumn';
import { BOARD_COLUMNS } from './utils';

type projectBoardpropsType = {
  tasks: TaskT[];
  userid: string;
  members: MemberDetailType[];
};

export default function ProjectBoard({
  tasks,
  members,
  userid,
}: projectBoardpropsType) {
  const { currentProject, openEditTaskModal } = useProjectTrackingContext();

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
    } catch (error) {
      console.error('DELETE_TASK_ERROR:', error);
    }
  };

  const meAsMemberOfProject = members.filter((m: MemberDetailType) => {
    return m.userId.toString() === userid.toString();
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <CreateNewTaskForm />

      <BoardHeader
        isAdmin={currentProject.isAdmin}
        members={members}
        title={currentProject.title}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {BOARD_COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            tasks={tasks}
            column={column}
            isAdmin={meAsMemberOfProject[0].role}
            onEditTask={openEditTaskModal}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
