import ProjectList from '@/components/code/projects/ProjectList';
import { GetUseridByToken, IsUserAuthenticate } from '@/utils/AuthRequest';
import { VerifyToken } from '@/utils/EncodeEmail';
import { cookies } from 'next/dist/server/request/cookies';

export default async function CodePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const userid = await VerifyToken(token!);
  console.log(userid?.userId);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ProjectList />
    </div>
  );
}
