import EditorLayout from '@/components/code/EditorLayout';
import { CodingSessionTimerProvider } from '@/context/CodingSessionTimer.context';
import { VerifyToken } from '@/utils/EncodeEmail';
import { cookies } from 'next/headers';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ codeSlug: string }>;
}) {
  // const { codeSlug } = await params;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <EditorLayout />
    </div>
  );
}
