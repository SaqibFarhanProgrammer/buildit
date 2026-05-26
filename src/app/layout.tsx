import './globals.css';
import ThemeInitializer from '@/components/theme/ThemeInitializer';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} cz-shortcut-listen="true">
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <ThemeInitializer />
        <>{children}</>
      </body>
    </html>
  );
}
