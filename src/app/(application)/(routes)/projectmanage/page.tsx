import ProjectTrackingShell from '@/components/project-tracking/ProjectTrackingShell';
import { GetProjectTrackingProjects } from '@/services/projectTracking/project-tracking.service';
import { ProjectTrackingT } from '@/types/project tracking/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  let projects: ProjectTrackingT[] = [];

  try {
    const response = await GetProjectTrackingProjects(token);

    projects = response;
  } catch (error) {
    console.error('Failed to load project tracking projects:', error);
  }

  return (
    <main className="min-h-screen bg-[#fff]/98">
      <ProjectTrackingShell projectsData={projects} />
    </main>
  );
}
