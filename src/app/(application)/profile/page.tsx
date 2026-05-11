import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsBar from '@/components/profile/StateBar';
import WorkflowCard from '@/components/profile/WorkflowList';
import TaskList from '@/components/profile/TaskList';

// ============ DUMMY DATA ============

const user = {
  name: 'Alex Chen',
  username: '@alexchen',
  email: 'alex@buildit.dev',
  role: 'Full Stack Developer',
  bio: 'Building scalable apps with TypeScript & Node.js. Open source contributor and AI enthusiast.',
  avatar: 'AC',
  location: 'San Francisco, CA',
  joinDate: 'March 2024',
};

const stats = [
  { label: 'Coding Hours', value: '128', unit: 'hrs', trend: '+12%' },
  { label: 'Tasks Done', value: '47', unit: '', trend: '+5' },
  { label: 'Pending', value: '12', unit: '', trend: '-2' },
  { label: 'Streak', value: '15', unit: 'days', trend: '🔥' },
];

const workflows = [
  {
    id: 1,
    title: 'AI Code Review',
    desc: 'Reviewed auth module with AI assistance',
    type: 'ai',
    time: '2h ago',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Project Setup',
    desc: 'Initialized Next.js 14 with TypeScript',
    type: 'project',
    time: '5h ago',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Bug Fix',
    desc: 'Fixed memory leak in dashboard',
    type: 'bug',
    time: '1d ago',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Dashboard Update',
    desc: 'Added analytics charts to main view',
    type: 'feature',
    time: '2d ago',
    status: 'completed',
  },
];

const tasks = [
  { id: 1, title: 'API Integration', status: 'pending', priority: 'high' },
  { id: 2, title: 'Write Tests', status: 'pending', priority: 'medium' },
  { id: 3, title: 'Update Docs', status: 'pending', priority: 'low' },
  { id: 4, title: 'Deploy to Vercel', status: 'completed', priority: 'high' },
  { id: 5, title: 'Code Review', status: 'completed', priority: 'medium' },
];

// ============ MAIN PAGE ============

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header — Full Width Top */}
      <ProfileHeader user={user} />

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left: Workflows */}
          <div className="flex-1">
            <WorkflowCard workflows={workflows} />
          </div>

          {/* Right: Tasks */}
          <div className="w-full lg:w-[380px] shrink-0">
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
