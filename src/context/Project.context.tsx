'use client';
import { AppError } from '@/lib/AppError';
import { ProjectType } from '@/types';
import { createContext, useContext, useState } from 'react';

type ValueType = {
  addProject: (project: ProjectType) => Promise<void>;
};

export const ProjectContext = createContext<ValueType>({
  addProject: async () => {},
});

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setprojects] = useState<ProjectType[]>([]);

  async function addProject(project: ProjectType) {
    setprojects((prev) => [project, ...prev]);
  }

  const value: ValueType = { addProject };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new AppError(
      'useProjectContext must be used within a ProjectProvider',
      400
    );
  }
  return context;
};
