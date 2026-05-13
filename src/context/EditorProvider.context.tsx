'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface File {
  id: string;
  name: string;
  language?: string;
  content?: string;
  isFolder?: boolean;
  children?: File[];
  isOpen?: boolean;
}

interface EditorContextType {
  activeFile: File | null;
  setActiveFile: (file: File) => void;
  files: File[];
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within EditorProvider');
  return context;
}

const initialFiles: File[] = [
  {
    id: '1',
    name: 'src',
    isFolder: true,
    isOpen: true,
    children: [
      {
        id: '2',
        name: 'components',
        isFolder: true,
        isOpen: true,
        children: [
          {
            id: '3',
            name: 'Button.tsx',
            language: 'typescript',
            content:
              'export default function Button() {\n  return <button>Click me</button>;\n}',
          },
          {
            id: '4',
            name: 'Card.tsx',
            language: 'typescript',
            content:
              "export default function Card() {\n  return <div className='card'>Card</div>;\n}",
          },
        ],
      },
      {
        id: '5',
        name: 'app',
        isFolder: true,
        isOpen: false,
        children: [
          {
            id: '6',
            name: 'page.tsx',
            language: 'typescript',
            content:
              'export default function Home() {\n  return <main>Hello World</main>;\n}',
          },
          {
            id: '7',
            name: 'layout.tsx',
            language: 'typescript',
            content:
              'export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html>{children}</html>;\n}',
          },
        ],
      },
      {
        id: '8',
        name: 'utils.ts',
        language: 'typescript',
        content:
          'export const formatDate = (date: Date) => date.toISOString();',
      },
    ],
  },
  {
    id: '9',
    name: 'public',
    isFolder: true,
    isOpen: false,
    children: [
      { id: '10', name: 'favicon.ico', language: 'plaintext', content: '' },
    ],
  },
  {
    id: '11',
    name: 'package.json',
    language: 'json',
    content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}',
  },
  {
    id: '12',
    name: 'README.md',
    language: 'markdown',
    content: '# My App\n\nThis is a sample project.',
  },
];

export default function EditorProvider({ children }: { children: ReactNode }) {
  const [activeFile, setActiveFile] = useState<File | null>(
    initialFiles[0].children?.[0].children?.[0] || null
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [zoom, setZoom] = useState(14);
  const [theme, setTheme] = useState('vs-dark');

  return (
    <EditorContext.Provider
      value={{
        activeFile,
        setActiveFile,
        files: initialFiles,
        terminalOpen,
        setTerminalOpen,
        zoom,
        setZoom,
        theme,
        setTheme,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
