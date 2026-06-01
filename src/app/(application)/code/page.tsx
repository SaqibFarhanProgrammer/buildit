import ProjectList from '@/components/code/projects/ProjectList';
import { ProjectType } from '@/types';

export default async function CodePage() {
  const projects: ProjectType[] = [
    {
      _id: 'proj-1',
      name: 'BuildIt Dashboard',
      description:
        'A dashboard for tracking project progress and team activity.',
      language: 'TypeScript',
      lastModified: '2026-05-28',
      filesCount: 24,
      status: 'Active',
    },
    {
      _id: 'proj-2',
      name: 'API Gateway',
      description:
        'A lightweight gateway service for routing and authenticating API requests.',
      language: 'JavaScript',
      lastModified: '2026-05-14',
      filesCount: 16,
      status: 'Finished',
    },
    {
      _id: 'proj-3',
      name: 'Component Library',
      description:
        'Reusable UI components and design tokens for the main application.',
      language: 'TypeScript',
      lastModified: '2026-05-30',
      filesCount: 32,
      status: 'Active',
    },
  ];
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ProjectList projectsData={projects} />
    </div>
  );
}
