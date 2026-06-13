import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsBar from '@/components/profile/StateBar';
import WorkflowCard from '@/components/profile/WorkflowList';
import TaskList from '@/components/profile/TaskList';
import { cookies } from 'next/headers';
import { getUserProfile } from '@/utils/GetProfiledata';
import { redirect } from 'next/navigation';
import { IUser, UserProfile } from '@/models/User.model';
import { UserRole } from '@/types';
type DbProfileUser = {
  name: string;
  email: string;
  image?: string;
  createdAt?: Date | string;
  profile?: { role?: UserRole };
};

function toProfileUser(user: DbProfileUser) {
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : 'Recently';

  return {
    name: user.name,
    email: user.email,
    image: user.image ? user.image : '',
    role: user.profile?.role ? user.profile.role : 'FrontEnd',
    avatar: user.name.charAt(0).toUpperCase(),
    joinDate,
  };
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const result = await getUserProfile(token);

  if (!result) {
    redirect('/auth/login');
  }

  const profileUser = toProfileUser(result.data as DbProfileUser);

  return (
    <div className="min-h-screen bg-white">
      <ProfileHeader user={profileUser} />

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
