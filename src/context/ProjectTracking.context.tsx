'use client';

import { AppError } from '@/lib/AppError';
import {
  ProjectDetailT,
  ProjectTrackingT,
  TaskState,
  TaskT,
} from '@/types/project tracking/types';
import { createContext, useContext, useState } from 'react';

type TaskModalMode = 'create' | 'edit';

type ProjectTrackingContextType = {
  projects: ProjectTrackingT[];
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  addProject: (project: ProjectTrackingT) => void;

  currentProject: ProjectDetailT | null;
  setCurrentProject: (project: ProjectDetailT) => void;
  tasks: TaskT[];
  addTask: (task: TaskT) => void;
  updateTask: (task: TaskT) => void;
  removeTask: (taskId: string) => void;

  isTaskModalOpen: boolean;
  taskModalMode: TaskModalMode;
  editingTask: TaskT | null;
  taskModalColumn: TaskState;
  openCreateTaskModal: (columnId?: TaskState) => void;
  openEditTaskModal: (task: TaskT) => void;
  closeTaskModal: () => void;
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
    tasks: [],
    addTask: () => {},
    updateTask: () => {},
    removeTask: () => {},
    isTaskModalOpen: false,
    taskModalMode: 'create',
    editingTask: null,
    taskModalColumn: 'not started',
    openCreateTaskModal: () => {},
    openEditTaskModal: () => {},
    closeTaskModal: () => {},
  }
);

export const ProjectTrackingProvider = ({
  children,
  initialProjects,
  initialProject,
}: {
  children: React.ReactNode;
  initialProjects?: ProjectTrackingT[];
  initialProject?: ProjectDetailT | null;
}) => {
  const [projects, setProjects] = useState<ProjectTrackingT[]>(
    initialProjects ?? []
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [currentProject, setCurrentProjectState] =
    useState<ProjectDetailT | null>(initialProject ?? null);
  const [tasks, setTasks] = useState<TaskT[]>(initialProject?.tasks ?? []);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<TaskModalMode>('create');
  const [editingTask, setEditingTask] = useState<TaskT | null>(null);
  const [taskModalColumn, setTaskModalColumn] =
    useState<TaskState>('not started');

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

  function setCurrentProject(project: ProjectDetailT) {
    setCurrentProjectState(project);
    setTasks(project.tasks);
  }

  function addTask(task: TaskT) {
    setTasks((prev) => [task, ...prev]);
    setProjects((prev) =>
      prev.map((p) =>
        p._id === task.projectid ? { ...p, tasks: [...p.tasks, task._id] } : p
      )
    );
    closeTaskModal();
  }

  function updateTask(task: TaskT) {
    setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    closeTaskModal();
  }

  function removeTask(taskId: string) {
    const task = tasks.find((t) => t._id === taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    if (task) {
      setProjects((prev) =>
        prev.map((p) =>
          p._id === task.projectid
            ? { ...p, tasks: p.tasks.filter((id) => id !== taskId) }
            : p
        )
      );
    }
  }

  function openCreateTaskModal(columnId?: TaskState) {
    setTaskModalMode('create');
    setEditingTask(null);
    setTaskModalColumn(columnId ?? 'not started');
    setIsTaskModalOpen(true);
  }

  function openEditTaskModal(task: TaskT) {
    setTaskModalMode('edit');
    setEditingTask(task);
    setTaskModalColumn(task.state);
    setIsTaskModalOpen(true);
  }

  function closeTaskModal() {
    setIsTaskModalOpen(false);
    setEditingTask(null);
    setTaskModalMode('create');
  }

  const value: ProjectTrackingContextType = {
    projects,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    addProject,
    currentProject,
    setCurrentProject,
    tasks,
    addTask,
    updateTask,
    removeTask,
    isTaskModalOpen,
    taskModalMode,
    editingTask,
    taskModalColumn,
    openCreateTaskModal,
    openEditTaskModal,
    closeTaskModal,
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
