'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { ITaskCard, TaskState } from '@/types/project tracking/types';
import axios from 'axios';
import { useState } from 'react';
import CreateNewTaskForm from './CreateNewTaskForm';
import BoardHeader from './board/BoardHeader';
import BoardColumn from './board/BoardColumn';
import { BOARD_COLUMNS } from './utils';

type projectBoardpropsType = {
  tasks: ITaskCard[];
};

export default function ProjectBoard({ tasks }: projectBoardpropsType) {
  const { currentProject, openCreateTaskModal, openEditTaskModal } =
    useProjectTrackingContext();

  const [searchQuery, setSearchQuery] = useState('');

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
          Project not found
        </p>
      </div>
    );
  }

  const getTasksByState = (state: TaskState) => {
    return tasks.filter(
      (t) =>
        t.state === state &&
        (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        `/api/projecttracking/delete-task?taskId=${taskId}&projectId=${currentProject._id}`
      );
    } catch (error) {
      console.error('DELETE_TASK_ERROR:', error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <CreateNewTaskForm />

      <BoardHeader
        title={currentProject.title}
        searchQuery={searchQuery}
        members={currentProject.members}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {BOARD_COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={getTasksByState(column.id)}
            isAdmin={currentProject.isAdmin}
            onCreateTask={openCreateTaskModal}
            onEditTask={openEditTaskModal}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
