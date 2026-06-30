import ProjectBoardShell from '@/components/project-tracking/ProjectBoardShell';
import {
  GetAllTasks,
  GetProjectMembers,
  GetProjectTrackingProject,
} from '@/services/projectTracking/project-tracking.service';
import { TaskT, MemberDetailType } from '@/types/project tracking/types';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  let response;
  let tasks: TaskT[] = [];
  let members: MemberDetailType[] = [];

  try {
    response = await GetProjectTrackingProject(slug, token);
  } catch {
    notFound();
  }

  try {
    tasks = await GetAllTasks(slug);
  } catch {
    tasks = [];
  }

  try {
    members = await GetProjectMembers(slug);
  } catch {
    members = [];
  }

  if (!response?.data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDF9F5]">
      <ProjectBoardShell
        Members={members ?? []}
        tasks={tasks ?? []}
        projectData={response.data}
      />
    </div>
  );
}
