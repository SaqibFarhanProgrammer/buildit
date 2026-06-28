import ProjectBoardShell from '@/components/project-tracking/ProjectBoardShell';
import { AppError } from '@/lib/AppError';
import {
  GetAllTasks,
  GetProjectMembers,
  GetProjectTrackingProject,
} from '@/services/projectTracking/project-tracking.service';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    throw new AppError('slug not found in params', 401);
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const response = await GetProjectTrackingProject(slug, token);
  const tasks = await GetAllTasks(slug);
  const Members = await GetProjectMembers(slug);

  if (!Members) {
    throw new AppError('Members not found in page', 401);
  }

  return (
    <div className="min-h-screen bg-[#FDF9F5]">
      <ProjectBoardShell
        Members={Members || []}
        tasks={tasks}
        projectData={response.data}
      />
    </div>
  );
}
