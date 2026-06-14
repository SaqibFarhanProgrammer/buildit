import ProjectTrackingList from '@/components/project-tracking/ProjectTrackingList';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Mock data - replace with your API call
async function getProjects(token: string) {
  // const res = await fetch(`${process.env.API_URL}/projects`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // return res.json();

  // Mock data for now
  return [
    {
      _id: 'proj_1',
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce application with payment integration and admin dashboard.',
      state: 'active',
      IsAdmin: true,
      YourhwereAdded: true,
      members: ['user_1', 'user_2', 'user_3'],
      tasks: ['task_1', 'task_2', 'task_3'],
      createdByUserName: 'Ali Huzaifa',
      createdByUserImage: '',
    },
    {
      _id: 'proj_2',
      title: 'AI Code Assistant',
      description: 'AI-powered code completion and review tool for developers.',
      state: 'active',
      IsAdmin: false,
      YourhwereAdded: true,
      members: ['user_1', 'user_4'],
      tasks: ['task_4', 'task_5'],
      createdByUserName: 'Saqib Farhan',
      createdByUserImage: '',
    },
    {
      _id: 'proj_3',
      title: 'Portfolio Website',
      description: 'Personal portfolio website with awwwards-style animations.',
      state: 'archive',
      IsAdmin: false,
      YourhwereAdded: false,
      members: ['user_2'],
      tasks: ['task_6'],
      createdByUserName: 'Muhammad Usman',
      createdByUserImage: '',
    },
  ];
}

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const projects = await getProjects(token);

  return (
    <main className="min-h-screen bg-white">
      <ProjectTrackingList projectsData={projects} />
    </main>
  );
}
