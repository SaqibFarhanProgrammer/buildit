import EditorLayout from '@/components/code/EditorLayout';
import { VerifyToken } from '@/utils/EncodeEmail';
import { cookies } from 'next/headers';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ codeSlug: string }>;
}) {

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <EditorLayout />
    </div>
  );
}
