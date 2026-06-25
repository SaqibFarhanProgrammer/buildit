'use client';

import { useState } from 'react';
import {
  RiAddLine,
  RiSubtractLine,
  RiSaveLine,
  RiPlayLine,
  RiSparklingLine,
  RiMoonLine,
  RiSunLine,
  RiTerminalLine,
  RiMoreLine,
} from 'react-icons/ri';
import axios from 'axios';
import { useEditor } from '@/context/EditorProvider.context';
import { log } from 'util';

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
    setIsSaveCodeIsOpen,
    setIsAiExplainWindowOpen,
    setIsRunning,
  } = useEditor();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleZoomIn = () => setZoom(Math.min(zoom + 2, 24));
  const handleZoomOut = () => setZoom(Math.max(zoom - 2, 10));

  const handleSave = () => {
    setIsSaveCodeIsOpen(true);
  };

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


      const output = response.data?.output;
      const lines = output
        .toString()
        .split('\n')
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
      {/* Left — Project Name */}
      <div className="flex items-center gap-3 ml-10 shrink-0">
        <h1 className="text-white/90 max-[620px]:hidden font-['inter-semi'] text-sm tracking-wide">
          {ProjectDetiles?.name}
        </h1>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2">
        {/* Language badge — hidden on small screens */}
        <div className="hidden sm:flex px-3 py-1.5 rounded-lg capitalize bg-white/[0.08] border border-white/[0.12] text-xs text-white/90 font-['inter-semi'] cursor-pointer">
          {language.toString()}
        </div>

        {/* AI Explain — hidden on small screens */}
        <button
          onClick={() => setIsAiExplainWindowOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0004ff]/15 text-[#4d6fff] hover:bg-[#0004ff]/25 transition-all shrink-0"
        >
          <RiSparklingLine className="w-3.5 h-3.5" />
          <span className="font-['inter-semi'] text-[10px]">Explain</span>
        </button>

        {/* Zoom Controls */}
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

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-1">
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
            className="h-8 px-3 rounded-lg gap-2 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <RiSaveLine className="w-4 h-4" />
            <span className="font-['inter-semi'] text-[11px]">Save</span>
          </button>

          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className={`h-8 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              terminalOpen
                ? 'text-[#4d6fff] bg-[#0004ff]/15'
                : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <RiTerminalLine className="w-4 h-4" />
            <span className="font-['inter-semi'] text-[11px]">Terminal</span>
          </button>

          {/* Run button — always visible on desktop */}
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0004ff] text-white hover:bg-[#1a33ff] transition-all ml-2"
          >
            <RiPlayLine className="w-3.5 h-3.5" />
            <span className="font-['inter-semi'] text-xs">Run</span>
          </button>
        </div>

        {/* Mobile/Tablet Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <RiMoreLine className="w-5 h-5" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-[90]"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-10 w-52 bg-[#141414] border border-white/[0.08] rounded-xl shadow-2xl z-[100] overflow-hidden">
                {/* Language — mobile only */}
                <div className="px-4 py-2.5 text-white/40 text-[11px] font-['inter-semi'] uppercase tracking-wider border-b border-white/[0.06]">
                  {language.toString()}
                </div>

                {/* AI Explain — mobile only */}
                <button
                  onClick={() => {
                    setIsAiExplainWindowOpen(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[#4d6fff] hover:bg-[#0004ff]/10 transition-all text-left"
                >
                  <RiSparklingLine className="w-4 h-4" />
                  <span className="font-['inter-semi'] text-[13px]">
                    AI Explain
                  </span>
                </button>

                <button
                  onClick={() => {
                    toggleTheme();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.05] transition-all text-left"
                >
                  {theme === 'vs-dark' ? (
                    <RiSunLine className="w-4 h-4" />
                  ) : (
                    <RiMoonLine className="w-4 h-4" />
                  )}
                  <span className="font-['inter-semi'] text-[13px]">
                    {theme === 'vs-dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    handleSave();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.05] transition-all text-left"
                >
                  <RiSaveLine className="w-4 h-4" />
                  <span className="font-['inter-semi'] text-[13px]">
                    Save Code
                  </span>
                </button>

                <button
                  onClick={() => {
                    setTerminalOpen(!terminalOpen);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left ${
                    terminalOpen
                      ? 'text-[#4d6fff] bg-[#0004ff]/10'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <RiTerminalLine className="w-4 h-4" />
                  <span className="font-['inter-semi'] text-[13px]">
                    {terminalOpen ? 'Close Terminal' : 'Open Terminal'}
                  </span>
                </button>

                <div className="h-px bg-white/[0.06] mx-3" />

                <button
                  onClick={() => {
                    handleRun();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[#0004ff] hover:bg-[#0004ff]/10 transition-all text-left"
                >
                  <RiPlayLine className="w-4 h-4" />
                  <span className="font-['inter-semi'] text-[13px]">
                    Run Code
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
