import Sidebar from '@/components/global/SideBar';

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Sidebar />
    </div>
  );
}
