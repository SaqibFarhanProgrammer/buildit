import EditorToolbar from '@/components/code/EditorToolbar';
import Sidebar from '@/components/global/SideBar';

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <EditorToolbar>{children}</EditorToolbar>
      <Sidebar />
    </div>
  );
}
