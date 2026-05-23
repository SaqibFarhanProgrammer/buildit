'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { EditorContextType, EditorFile } from '@/types/editor.types';

const EditorContext = createContext<EditorContextType | null>(null);

export default function EditorProvider({ children }: { children: ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [zoom, setZoom] = useState(14);
  const [theme, setTheme] = useState('vs-dark');
  const [activeFile, setActiveFile] = useState<EditorFile | null>({
    id: 'main.js',
    name: 'main.js',
    language: 'javascript',
    content: '// Select a file to start coding',
  });

  return (
    <EditorContext.Provider
      value={{
        terminalOpen,
        setTerminalOpen,
        zoom,
        setZoom,
        theme,
        setTheme,
        activeFile,
        setActiveFile,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within EditorProvider');
  return context;
}
