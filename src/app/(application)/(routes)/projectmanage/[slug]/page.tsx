import ProjectBoard from '@/components/project-tracking/ProjectBoard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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



  return (
    <div className="min-h-screen bg-white">
      <ProjectBoard  />
    </div>
  );
}
