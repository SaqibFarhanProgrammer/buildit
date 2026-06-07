'use client';

import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import EditorToolbar from './EditorToolbar';
import Terminal from './Terminal';
import EditorProvider, { useEditor } from '@/context/EditorProvider.context';
import SaveCodePopup from './projects/SaveCode';

function EditorContent() {
  const { terminalOpen, setTerminalOpen, IsSaveCodeIsOpen } = useEditor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'j') {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A]">
      {IsSaveCodeIsOpen && <SaveCodePopup />}
      <EditorToolbar />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <CodeEditor />

          {terminalOpen && <Terminal />}
        </div>
      </div>
    </div>
  );
}

export default function EditorLayout({}) {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}
