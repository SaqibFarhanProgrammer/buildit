'use client';

import { useEffect } from 'react';
import EditorProvider, {
  useEditor,
} from '../../context/EditorProvider.context';
import FileTree from './FileTree';
import CodeEditor from './CodeEditor';
import EditorToolbar from './EditorToolbar';
import Terminal from './Terminal';

function EditorContent() {
  const { terminalOpen, setTerminalOpen } = useEditor();

  // Ctrl+J to toggle terminal
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
      {/* Top Toolbar */}
      <EditorToolbar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: File Tree */}
        <FileTree />

        {/* Right: Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <CodeEditor />

          {/* Bottom: Terminal (toggleable) */}
          {terminalOpen && <Terminal />}
        </div>
      </div>
    </div>
  );
}

export default function EditorLayout() {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}
