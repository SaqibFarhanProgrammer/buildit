import ChatHeader from '@/components/Ai-Chat/ChatHeader';
import ChatInterface from '@/components/Ai-Chat/ChatInterface';
import { getUserProfile } from '@/utils/GetProfiledata';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AIChatPage() {
  const cookieStore = await cookies();

  const token = await cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const profiledata = await getUserProfile(token);
  console.log(profiledata);


  
  
  return (
    <div className="min-h-screen bg-white flex flex-col"> 
      <ChatHeader />
      <ChatInterface  profile={profiledata.data }/>
    </div>
  );
}
