import dynamic from 'next/dynamic';
import CodeEditorSkeleton from '@/components/Skeliton/CodeEdittorSkeliton';
const EditorLayout = dynamic(() => import('@/components/code/EditorLayout'), {
  loading: () => <CodeEditorSkeleton />,
});

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
