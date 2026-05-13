'use client';

import { useEditor } from '../../context/EditorProvider.context';

export default function CodeEditor() {
  const { activeFile, zoom, theme } = useEditor();

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0A0A0A]">
        <p className="font-['inter-light'] text-sm text-white/20">
          Select a file to start editing
        </p>
      </div>
    );
  }

  // Simple code display (replace with Monaco Editor in production)
  const lines = activeFile.content.split('\n');

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[#0A0A0A] border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded-t-lg border-t border-l border-r border-white/10">
          <span className="font-['inter4-medium'] text-xs text-white">
            {activeFile.name}
          </span>
          <span className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Editor Area */}
      <div
        className="flex-1 overflow-auto font-mono"
        style={{ fontSize: `${zoom}px` }}
      >
        <div className="flex">
          {/* Line Numbers */}
          <div className="shrink-0 w-12 py-4 text-right pr-3 bg-[#0A0A0A] border-r border-white/5 select-none">
            {lines.map((_, i) => (
              <div
                key={i}
                className="font-['inter-light'] text-white/20 leading-relaxed"
                style={{ fontSize: `${zoom}px`, lineHeight: '1.6' }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 py-4 pl-4">
            {lines.map((line, i) => (
              <div
                key={i}
                className="leading-relaxed whitespace-pre"
                style={{ fontSize: `${zoom}px`, lineHeight: '1.6' }}
              >
                <SyntaxHighlight line={line} language={activeFile.language} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple syntax highlighting
function SyntaxHighlight({
  line,
  language,
}: {
  line: string;
  language: string;
}) {
  if (language === 'json') {
    return (
      <span className="font-['inter-rag']">
        {line.split(/(".*?")/g).map((part, i) =>
          part.startsWith('"') ? (
            <span key={i} className="text-[#ce9178]">
              {part}
            </span>
          ) : (
            <span key={i} className="text-white/80">
              {part}
            </span>
          )
        )}
      </span>
    );
  }

  // TypeScript/JSX highlighting
  const keywords = [
    'export',
    'default',
    'function',
    'return',
    'const',
    'let',
    'var',
    'import',
    'from',
  ];
  const words = line.split(/(\s+|[{}()<>[\].,;])/);

  return (
    <span className="font-['inter-rag']">
      {words.map((word, i) => {
        if (keywords.includes(word)) {
          return (
            <span key={i} className="text-[#569cd6]">
              {word}
            </span>
          );
        }
        if (
          word.startsWith('"') ||
          word.startsWith("'") ||
          word.startsWith('`')
        ) {
          return (
            <span key={i} className="text-[#ce9178]">
              {word}
            </span>
          );
        }
        if (/^[A-Z][a-zA-Z]*$/.test(word)) {
          return (
            <span key={i} className="text-[#4ec9b0]">
              {word}
            </span>
          );
        }
        if (word.startsWith('//')) {
          return (
            <span key={i} className="text-[#6a9955]">
              {word}
            </span>
          );
        }
        return (
          <span key={i} className="text-white/80">
            {word}
          </span>
        );
      })}
    </span>
  );
}
