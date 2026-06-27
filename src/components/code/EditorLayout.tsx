'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
const CodeEditor = dynamic(() => import('./CodeEditor'), {
  loading: () => <p>Loading editor...</p>,
  ssr: false,
});
import EditorToolbar from './EditorToolbar';
import Terminal from './Terminal';
import EditorProvider, { useEditor } from '@/context/EditorProvider.context';
import SaveCodePopup from './projects/SaveCode';
import AIExplainWindow from './projects/AiExplainWindow';

function EditorContent() {
  const {
    terminalOpen,
    setTerminalOpen,
    IsAiExplainWindowOpen,
    IsSaveCodeIsOpen,
    setIsAiExplainWindowOpen,
  } = useEditor();

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
    <div className="h-screen flex bg-[#0A0A0A]">
      <div
        className={`flex flex-col transition-all duration-300 ${
          IsAiExplainWindowOpen ? 'hidden md:flex md:w-[60%]' : 'w-full'
        }`}
      >
        {IsSaveCodeIsOpen && <SaveCodePopup />}
        <EditorToolbar />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0">
            <CodeEditor />

            {terminalOpen && <Terminal />}
          </div>
        </div>
      </div>

      {IsAiExplainWindowOpen && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm
            md:static md:z-auto md:flex md:w-[40%] md:h-full md:border-l md:border-white/[0.06] md:bg-[#0A0A0A] md:backdrop-blur-none
          "
        >
          <button
            onClick={() => setIsAiExplainWindowOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="w-[90%] h-[90%] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] md:w-full md:h-full md:rounded-none md:border-none">
            <AIExplainWindow />
          </div>
        </div>
      )}
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
