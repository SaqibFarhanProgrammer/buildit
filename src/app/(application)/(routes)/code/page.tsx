import ProjectList from '@/components/code/projects/ProjectList';
import { GetProjects } from '@/services/codeProject/create-project.service';
import { ProjectType } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CodePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  let projects: ProjectType[] = [];

  try {
    const response = await GetProjects(token);
    projects = response.data as unknown as ProjectType[];
  } catch (error) {
    console.error('Failed to load projects:', error);
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-white">
      <ProjectList projectsData={projects} />
    </div>
  );
}
