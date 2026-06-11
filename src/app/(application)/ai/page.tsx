import ChatInterface from '@/components/Ai-Chat/ChatInterface';
import { getUserProfile } from '@/utils/GetProfiledata';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AIChatPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const profiledata = await getUserProfile(token);

  if (!profiledata?.data) {
    redirect('/auth/login');
  }

  return <ChatInterface profile={profiledata.data} />;
}
