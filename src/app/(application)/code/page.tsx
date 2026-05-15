import ProjectList from '@/components/code/projects/ProjectList';
import { ProjectType } from '@/types/code-edittor/projects/projects.types';

// Dummy data — replace with API later
const Projects: ProjectType[] = [
  {
    id: '1',
    name: 'E-Commerce API',
    description: 'Full-stack e-commerce platform with Node.js and React',
    language: 'TypeScript',
    lastModified: '2026-05-14T10:30:00Z',
    filesCount: 24,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Portfolio Site',
    description: 'Personal portfolio with Next.js and Tailwind',
    language: 'TypeScript',
    lastModified: '2026-05-13T15:20:00Z',
    filesCount: 12,
    status: 'Active',
  },
  {
    id: '3',
    name: 'AI Chat Bot',
    description: 'Python-based conversational AI with OpenAI',
    language: 'Python',
    lastModified: '2026-05-12T09:15:00Z',
    filesCount: 8,
    status: 'Finished',
  },
  {
    id: '4',
    name: 'Task Manager',
    description: 'Kanban-style task management app',
    language: 'JavaScript',
    lastModified: '2026-05-10T14:45:00Z',
    filesCount: 18,
    status: 'Active',
  },
  {
    id: '5',
    name: 'Weather Dashboard',
    description: 'Real-time weather data visualization',
    language: 'TypeScript',
    lastModified: '2026-05-08T11:00:00Z',
    filesCount: 15,
    status: 'Active',
  },
];

export default async function CodePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ProjectList initialProjects={Projects} />
    </div>
  );
}
