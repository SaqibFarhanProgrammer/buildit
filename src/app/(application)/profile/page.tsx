import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsBar from '@/components/profile/StateBar';
import WorkflowCard from '@/components/profile/WorkflowList';
import TaskList from '@/components/profile/TaskList';
import { cookies } from 'next/headers';
import { getUserProfile } from '@/utils/GetProfiledata';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return <div>Unauthorized</div>;
  }

  const result = await getUserProfile(token);

  if (!result) {
    return <div>User not found</div>;
  }

  const user = result.data;

  return (
    <div className="min-h-screen bg-white">
      <ProfileHeader user={user} />

      <StatsBar
        stats={[
          { label: 'Coding Hours', value: '128', unit: 'hrs', trend: '+12%' },
          { label: 'Tasks Done', value: '47', unit: '', trend: '+5' },
          { label: 'Pending', value: '12', unit: '', trend: '-2' },
          { label: 'Streak', value: '15', unit: 'days', trend: '🔥' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1">
            <WorkflowCard workflows={[]} />
          </div>

          <div className="w-full lg:w-[380px] shrink-0">
            <TaskList tasks={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}