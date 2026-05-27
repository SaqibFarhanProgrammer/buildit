'use client';
import { AppError } from '@/lib/AppError';
import { ProjectType } from '@/types';
import { createContext, useContext, useState } from 'react';

const Projectsdata: ProjectType[] = [
  {
    _id: '1',
    name: 'E-Commerce API',
    description: 'Full-stack e-commerce platform with Node.js and React',
    language: 'TypeScript',
    lastModified: '2026-05-14T10:30:00Z',
    filesCount: 24,
    status: 'Active',
  },
  {
    _id: '2',
    name: 'Portfolio Site',
    description: 'Personal portfolio with Next.js and Tailwind',
    language: 'TypeScript',
    lastModified: '2026-05-13T15:20:00Z',
    filesCount: 12,
    status: 'Active',
  },
  {
    _id: '3',
    name: 'AI Chat Bot',
    description: 'Python-based conversational AI with OpenAI',
    language: 'Python',
    lastModified: '2026-05-12T09:15:00Z',
    filesCount: 8,
    status: 'Finished',
  },
  {
    _id: '4',
    name: 'Task Manager',
    description: 'Kanban-style task management app',
    language: 'JavaScript',
    lastModified: '2026-05-10T14:45:00Z',
    filesCount: 18,
    status: 'Active',
  },
  {
    _id: '5',
    name: 'Weather Dashboard',
    description: 'Real-time weather data visualization',
    language: 'TypeScript',
    lastModified: '2026-05-08T11:00:00Z',
    filesCount: 15,
    status: 'Active',
  },
];

type ValueType = {
  projects: ProjectType[];
  setprojects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  addProject: (project: ProjectType) => Promise<void>;
};

export const ProjectContext = createContext<ValueType>({
  projects: Projectsdata,
  addProject: async () => {},
  setprojects: () => {},
});

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setprojects] = useState<ProjectType[]>(Projectsdata);

  async function addProject(project: ProjectType) {
    setprojects((prev) => [project, ...prev]);
  }

  const value: ValueType = { projects, setprojects, addProject };
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
