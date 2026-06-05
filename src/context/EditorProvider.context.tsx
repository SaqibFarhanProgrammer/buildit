'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { EditorContextType } from '@/types/editor.types';
import { ProjectType } from '@/types';

const EditorContext = createContext<EditorContextType | null>(null);

export default function EditorProvider({ children }: { children: ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [zoom, setZoom] = useState(14);
  const [theme, setTheme] = useState('vs-dark');
  const [CodeValue, setCodeValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [ProjectDetiles, setProjectDetiles] = useState<ProjectType | null>(null);

  return (
    <EditorContext.Provider
      value={{
        terminalOpen,
        setTerminalOpen,
        zoom,
        setZoom,
        theme,
        setTheme,
        CodeValue,
        setCodeValue,
        language,
        setLanguage,
        output,
        setOutput,
        isRunning,
        setIsRunning,
        ProjectDetiles,
        setProjectDetiles,
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
