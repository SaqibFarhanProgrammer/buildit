import ProjectBoardShell from '@/components/project-tracking/ProjectBoardShell';
import { GetProjectTrackingProject } from '@/services/projectTracking/project-tracking.service';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

    const response = await GetProjectTrackingProject(slug, token);


    return (
      <div className="min-h-screen bg-white">
        <ProjectBoardShell projectData={response.data} />
      </div>
    );
  } 

