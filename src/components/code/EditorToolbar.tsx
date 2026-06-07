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
    ProjectDetiles,
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
    <div className="h-12 bg-[#0A0A0A] border-b border-white/[0.12] flex items-center justify-between px-4">
      {/* Left: Language Label */}
      <div className="flex items-center gap-3 ml-10">
        <h1 className="text-white/90 font-['inter-semi'] text-sm tracking-wide">
          {ProjectDetiles?.language}
        </h1>
      </div>

      {/* Center: Language Badge + Explain + Zoom */}
      <div className="flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg capitalize bg-white/[0.08] border border-white/[0.12] text-xs text-white/90 font-['inter-semi'] focus:outline-none focus:border-[#0004ff] transition-all cursor-pointer">
          {language.toString()}
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0004ff]/15 text-[#4d6fff] hover:bg-[#0004ff]/25 transition-all">
          <RiSparklingLine className="w-3.5 h-3.5" />
          <span className="font-['inter-semi'] text-[10px]">Explain</span>
        </button>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <RiSubtractLine className="w-3.5 h-3.5" />
          </button>
          <span className="font-['inter-semi'] text-[10px] text-white/70 w-6 text-center">
            {zoom}
          </span>
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <RiAddLine className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Theme Toggle + Save + Terminal + Run */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          {theme === 'vs-dark' ? (
            <RiSunLine className="w-4 h-4" />
          ) : (
            <RiMoonLine className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={handleSave}
          className="w-27 h-8 rounded-lg gap-2 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <RiSaveLine className="w-4 h-4" />
          save code
        </button>
        


        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className={`w-40 h-8 rounded-lg flex items-center justify-center transition-all ${
            terminalOpen
              ? 'text-[#4d6fff] bg-[#0004ff]/15'
              : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
          }`}
        >
          <span className="font-['inter-semi'] pt-1 text-[12px]">
            Open Terminal / CTRL + J
          </span>
        </button>

        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0004ff] text-white hover:bg-[#1a33ff] transition-all ml-2"
        >
          <RiPlayLine className="w-3.5 h-3.5" />
          <span className="font-['inter-semi'] text-xs">Run</span>
        </button>
      </div>
    </div>
  );
}
