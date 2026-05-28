import { ProjectProvider } from '@/context/Project.context';
import './globals.css';
import { CodingSessionTimerProvider } from '@/context/CodingSessionTimer.context';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} cz-shortcut-listen="true">
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <ProjectProvider>
          <CodingSessionTimerProvider>{children}</CodingSessionTimerProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
