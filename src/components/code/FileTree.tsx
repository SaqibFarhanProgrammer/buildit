'use client';

import { useState } from 'react';
import { useEditor } from '../../context/EditorProvider.context';
import {
  RiFolderOpenLine,
  RiFolderLine,
  RiFileCodeLine,
  RiFileTextLine,
  RiChevronRight,
  RiChevronDown,
} from 'react-icons/ri';

interface File {
  id: string;
  name: string;
  language: string;
  content: string;
  isFolder?: boolean;
  children?: File[];
  isOpen?: boolean;
}

function FileItem({ file, depth = 0 }: { file: File; depth?: number }) {
  const [isOpen, setIsOpen] = useState(file.isOpen || false);
  const { activeFile, setActiveFile } = useEditor();

  const isActive = activeFile?.id === file.id;

  const getFileIcon = () => {
    if (file.isFolder) {
      return isOpen ? (
        <RiFolderOpenLine className="w-4 h-4 text-[#0004ff]" />
      ) : (
        <RiFolderLine className="w-4 h-4 text-white/40" />
      );
    }
    if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      return <RiFileCodeLine className="w-4 h-4 text-[#3178c6]" />;
    }
    return <RiFileTextLine className="w-4 h-4 text-white/40" />;
  };

  if (file.isFolder) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-white/5 transition-all text-left group"
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          {isOpen ? (
            <RiChevronDown className="w-3 h-3 text-white/40" />
          ) : (
            <RiChevronRight className="w-3 h-3 text-white/40" />
          )}
          {getFileIcon()}
          <span className="font-['inter4-medium'] text-xs text-white/70 group-hover:text-white truncate">
            {file.name}
          </span>
        </button>
        {isOpen &&
          file.children?.map((child) => (
            <FileItem key={child.id} file={child} depth={depth + 1} />
          ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => setActiveFile(file)}
      className={`flex items-center gap-2 w-full px-3 py-1.5 transition-all text-left group ${
        isActive
          ? 'bg-[#0004ff]/10 border-r-2 border-[#0004ff]'
          : 'hover:bg-white/5'
      }`}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
    >
      <span className="w-3" /> {/* Spacer for alignment */}
      {getFileIcon()}
      <span
        className={`font-['inter4-medium'] text-xs truncate ${
          isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'
        }`}
      >
        {file.name}
      </span>
    </button>
  );
}

export default function FileTree() {
  const { files } = useEditor();

  return (
    <div className="w-60 shrink-0 bg-[#0A0A0A] border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="font-['inter-semi'] text-[10px] text-white/40 uppercase tracking-wider">
          Explorer
        </span>
        <button className="text-white/20 hover:text-white/40 transition-all">
          <RiFileCodeLine className="w-4 h-4" />
        </button>
      </div>

      {/* Files */}
      <div className="flex-1 overflow-y-auto py-2">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
