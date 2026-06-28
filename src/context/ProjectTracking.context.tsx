'use client';

import { AppError } from '@/lib/AppError';
import { TaskState } from '@/models/project traccking/task-tracking.models';
import {
  MemberDetailType,
  ProjectTrackingT,
  TaskT,
} from '@/types/project tracking/types';
import React, { createContext, useContext, useState } from 'react';

type TaskModalMode = 'create' | 'edit';

type ProjectTrackingContextType = {
  projects: ProjectTrackingT[];
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  addProject: (project: ProjectTrackingT) => void;
  setIsTaskModalOpen: React.Dispatch<boolean>;
  currentProject: ProjectTrackingT | null;
  setCurrentProject: (project: ProjectTrackingT) => void;

  members: MemberDetailType[];
  currentUserRole: string;

  isTaskModalOpen: boolean;
  taskModalMode: TaskModalMode;
  editingTask: TaskT | null;
  taskModalColumn: TaskState;
  openCreateTaskModal: (columnId?: TaskState) => void;
  openEditTaskModal: (task: TaskT) => void;
  closeTaskModal: () => void;

  previewTask: TaskT | null;
  isTaskPreviewOpen: boolean;
  openTaskPreview: (task: TaskT) => void;
  closeTaskPreview: () => void;
};

export const ProjectTrackingContext = createContext<ProjectTrackingContextType>(
  {
    projects: [],
    isCreateModalOpen: false,
    openCreateModal: () => {},
    closeCreateModal: () => {},
    addProject: () => {},
    currentProject: null,
    setCurrentProject: () => {},
    members: [],
    currentUserRole: 'viewer',
    isTaskModalOpen: false,
    taskModalMode: 'create',
    editingTask: null,
    taskModalColumn: 'TO DO',
    openCreateTaskModal: () => {},
    openEditTaskModal: () => {},
    closeTaskModal: () => {},
    setIsTaskModalOpen: () => {},
    previewTask: null,
    isTaskPreviewOpen: false,
    openTaskPreview: () => {},
    closeTaskPreview: () => {},
  }
);

export const ProjectTrackingProvider = ({
  children,
  initialProjects,
  initialProject,
  initialMembers,
  initialUserRole,
}: {
  children: React.ReactNode;
  initialProjects?: ProjectTrackingT[];
  initialProject?: ProjectTrackingT | null;
  initialMembers?: MemberDetailType[];
  initialUserRole?: string;
}) => {
  const [projects, setProjects] = useState<ProjectTrackingT[]>(
    initialProjects ?? []
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [currentProject, setCurrentProjectState] =
    useState<ProjectTrackingT | null>(initialProject ?? null);

  const [members] = useState<MemberDetailType[]>(initialMembers ?? []);
  const [currentUserRole] = useState<string>(initialUserRole ?? 'viewer');

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<TaskModalMode>('create');
  const [editingTask, setEditingTask] = useState<TaskT | null>(null);
  const [taskModalColumn, setTaskModalColumn] = useState<TaskState>('TO DO');

  const [previewTask, setPreviewTask] = useState<TaskT | null>(null);
  const [isTaskPreviewOpen, setIsTaskPreviewOpen] = useState(false);

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  function addProject(project: ProjectTrackingT) {
    setProjects((prev) => [project, ...prev]);
    closeCreateModal();
  }

  function setCurrentProject(project: ProjectTrackingT) {
    setCurrentProjectState(project);
  }

  function openCreateTaskModal(columnId?: TaskState) {
    setTaskModalMode('create');
    setEditingTask(null);
    setIsTaskModalOpen(true);
    if (columnId) {
      setTaskModalColumn(columnId);
    }
  }

  function openEditTaskModal(task: TaskT) {
    setTaskModalMode('edit');
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }

  function closeTaskModal() {
    setIsTaskModalOpen(false);
    setEditingTask(null);
    setTaskModalMode('create');
  }

  function openTaskPreview(task: TaskT) {
    setPreviewTask(task);
    setIsTaskPreviewOpen(true);
  }

  function closeTaskPreview() {
    setIsTaskPreviewOpen(false);
    setPreviewTask(null);
  }

  const value: ProjectTrackingContextType = {
    projects,
    isCreateModalOpen,
    openCreateModal,
    setIsTaskModalOpen,
    closeCreateModal,
    addProject,
    currentProject,
    setCurrentProject,
    members,
    currentUserRole,
    isTaskModalOpen,
    taskModalMode,
    editingTask,
    taskModalColumn,
    openCreateTaskModal,
    openEditTaskModal,
    closeTaskModal,
    previewTask,
    isTaskPreviewOpen,
    openTaskPreview,
    closeTaskPreview,
  };

  return (
    <ProjectTrackingContext.Provider value={value}>
      {children}
    </ProjectTrackingContext.Provider>
  );
};

export const useProjectTrackingContext = () => {
  const context = useContext(ProjectTrackingContext);
  if (!context) {
    throw new AppError(
      'useProjectTrackingContext must be used within a ProjectTrackingProvider',
      400
    );
  }
  return context;
};
