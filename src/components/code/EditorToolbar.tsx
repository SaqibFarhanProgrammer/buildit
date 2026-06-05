'use client';

import {
  RiAddLine,
  RiSubtractLine,
  RiDownloadLine,
  RiSaveLine,
  RiPlayLine,
  RiSparklingLine,
  RiMoonLine,
  RiSunLine,
} from 'react-icons/ri';
import { FaLaptopCode } from 'react-icons/fa';
import axios from 'axios';
import { useEditor } from '@/context/EditorProvider.context';
import { languagesMap } from '../../../data';

const languageList = Object.entries(languagesMap).map(([key, value]: [string, any]) => ({
  key,
  name: value.name,
}));

export default function EditorToolbar() {
  const {
    zoom,
    setZoom,
    theme,
    setTheme,
    terminalOpen,
    setTerminalOpen,
    CodeValue,
    language,
    setLanguage,
    setOutput,
    setIsRunning,
  } = useEditor();

  const handleZoomIn = () => setZoom(Math.min(zoom + 2, 24));
  const handleZoomOut = () => setZoom(Math.max(zoom - 2, 10));
  const handleSave = () => {};

  const handleRun = async () => {
    if (!CodeValue.trim()) {
      setOutput(['No code to run.']);
      setTerminalOpen(true);
      return;
    }

    setTerminalOpen(true);
    setIsRunning(true);
    setOutput(['Running...']);

    try {
      const response = await axios.post('/api/codeproject/run', {
        code: CodeValue,
        language,
      });

      const output = response.data?.output ?? 'No output';
      const lines = output
        .toString()
        .split(/\r?\n/)
        .filter((line: string) => line.length > 0);

      setOutput(lines.length ? lines : ['No output']);
    } catch (error) {
      console.error('Run error:', error);
      setOutput(['Execution failed. Check console for details.']);
    } finally {
      setIsRunning(false);
    }
  };
  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  return (
    <div className="h-12 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* <h1>{activeFile?.language}</h1> */}
      </div>

      <div className="flex items-center gap-1">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-['inter-semi'] focus:outline-none focus:border-[#0004ff] transition-all cursor-pointer"
        >
          {languageList.map((lang) => (
            <option key={lang.key} value={lang.key}>
              {lang.name.split(' (')[0]}
            </option>
          ))}
        </select>

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0004ff]/10 text-[#0004ff] hover:bg-[#0004ff]/20 transition-all"
        >
          <RiSparklingLine className="w-3.5 h-3.5" />
          <span className="font-['inter-semi'] text-[10px]">Explain</span>
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0004ff]/10 text-[#0004ff] hover:bg-[#0004ff]/20 transition-all"
        >
          <FaLaptopCode className="w-3.5 h-3.5" />
          <span className="font-['inter-semi'] text-[10px]">
            Start a Coding Sesstion
          </span>
        </button>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <RiSubtractLine className="w-3.5 h-3.5" />
          </button>
          <span className="font-['inter-semi'] text-[10px] text-white/40 w-6 text-center">
            {zoom}
          </span>
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <RiAddLine className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          {theme === 'vs-dark' ? (
            <RiSunLine className="w-4 h-4" />
          ) : (
            <RiMoonLine className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={handleSave}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <RiSaveLine className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            terminalOpen
              ? 'text-[#0004ff] bg-[#0004ff]/10'
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="font-['inter-semi'] text-[10px]">⌘J</span>
        </button>

        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0004ff] text-white hover:bg-[#0004ff]/90 transition-all ml-2"
        >
          <RiPlayLine className="w-3.5 h-3.5" />
          <span className="font-['inter-semi'] text-xs">Run</span>
        </button>
      </div>
    </div>
  );
}
