'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { useEditor } from '@/context/EditorProvider.context';

export default function CodeEditor() {
  const { activeFile, zoom, theme } = useEditor();

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
      {/* Tabs */}
      <div className="h-9 bg-[#0A0A0A] flex items-center border-b border-[#1a1a1a]">
        {activeFile && (
          <div className="h-full px-4 flex items-center gap-2 bg-[#0A0A0A] border-t-2 border-[#0004ff] text-[#ffffff]">
            <FileIcon language={activeFile.language} />
            <span className="text-xs font-['inter-semi']">
              {activeFile.name}
            </span>
            <button className="text-[#333333] hover:text-[#ffffff] ml-2 text-[10px] transition-colors">
              ×
            </button>
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={activeFile?.language || 'javascript'}
          language={activeFile?.language || 'javascript'}
          value={activeFile?.content || '// Select a file to start coding'}
          theme="buildit-black"
          options={{
            fontSize: zoom,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            cursorStyle: 'line',
            cursorBlinking: 'blink',
            smoothScrolling: true,
            contextmenu: true,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            padding: { top: 16 },
          }}
          onMount={(editor, monaco) => {
            // Proper syntax highlighting with #0A0A0A background
            monaco.editor.defineTheme('buildit-black', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                // Comments - Gray
                { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
                {
                  token: 'comment.doc',
                  foreground: '6A737D',
                  fontStyle: 'italic',
                },

                // Keywords - White bold (import, export, function, const, etc)
                { token: 'keyword', foreground: 'FF7B72', fontStyle: 'bold' },
                { token: 'keyword.control', foreground: 'FF7B72' },
                { token: 'keyword.operator', foreground: 'FF7B72' },
                { token: 'keyword.other', foreground: 'FF7B72' },

                // Types - Cyan/Blue
                { token: 'type', foreground: '79C0FF' },
                { token: 'type.identifier', foreground: '79C0FF' },
                { token: 'namespace', foreground: '79C0FF' },

                // Functions - Blue
                { token: 'function', foreground: 'D2A8FF' },
                { token: 'function.declaration', foreground: 'D2A8FF' },
                { token: 'function.call', foreground: 'D2A8FF' },
                { token: 'method', foreground: 'D2A8FF' },

                // Identifiers/Variables - White
                { token: 'identifier', foreground: 'E6EDF3' },
                { token: 'variable', foreground: 'E6EDF3' },
                { token: 'variable.other', foreground: 'E6EDF3' },
                { token: 'variable.parameter', foreground: 'FFA657' },

                // Strings - Green
                { token: 'string', foreground: 'A5D6FF' },
                { token: 'string.quote', foreground: 'A5D6FF' },
                { token: 'string.template', foreground: 'A5D6FF' },
                { token: 'string.regex', foreground: 'A5D6FF' },

                // Numbers - Blue
                { token: 'number', foreground: '79C0FF' },
                { token: 'number.float', foreground: '79C0FF' },
                { token: 'number.hex', foreground: '79C0FF' },

                // Operators - White/Gray
                { token: 'operator', foreground: 'FF7B72' },
                { token: 'delimiter', foreground: 'C9D1D9' },
                { token: 'delimiter.bracket', foreground: 'C9D1D9' },
                { token: 'delimiter.parenthesis', foreground: 'C9D1D9' },

                // Tags (HTML/JSX) - Blue
                { token: 'tag', foreground: '7EE787' },
                { token: 'tag.id', foreground: '79C0FF' },
                { token: 'tag.class', foreground: '79C0FF' },
                { token: 'attribute.name', foreground: '7EE787' },
                { token: 'attribute.value', foreground: 'A5D6FF' },

                // CSS properties
                { token: 'property', foreground: '79C0FF' },
                { token: 'property.value', foreground: 'A5D6FF' },
                { token: 'unit', foreground: '79C0FF' },

                // JSON
                { token: 'key', foreground: '7EE787' },
                { token: 'string.key', foreground: '7EE787' },

                // Markdown
                {
                  token: 'markup.heading',
                  foreground: '79C0FF',
                  fontStyle: 'bold',
                },
                {
                  token: 'markup.bold',
                  foreground: 'E6EDF3',
                  fontStyle: 'bold',
                },
                {
                  token: 'markup.italic',
                  foreground: 'E6EDF3',
                  fontStyle: 'italic',
                },
                { token: 'markup.link', foreground: 'A5D6FF' },
                { token: 'markup.code', foreground: 'FFA657' },

                // Constants
                { token: 'constant', foreground: '79C0FF' },
                { token: 'constant.language', foreground: '79C0FF' },
                { token: 'constant.numeric', foreground: '79C0FF' },
                { token: 'constant.character', foreground: 'A5D6FF' },

                // Storage (const, let, var, class, interface)
                { token: 'storage', foreground: 'FF7B72', fontStyle: 'bold' },
                { token: 'storage.type', foreground: 'FF7B72' },
                { token: 'storage.modifier', foreground: 'FF7B72' },

                // Support (built-in objects, methods)
                { token: 'support', foreground: '79C0FF' },
                { token: 'support.function', foreground: 'D2A8FF' },
                { token: 'support.class', foreground: '79C0FF' },
                { token: 'support.type', foreground: '79C0FF' },

                // Invalid/Error
                { token: 'invalid', foreground: 'FF4444' },
                { token: 'error', foreground: 'FF4444' },
              ],
              colors: {
                // Editor core
                'editor.background': '#0A0A0A',
                'editor.foreground': '#E6EDF3',

                // Line highlight
                'editor.lineHighlightBackground': '#111111',
                'editor.lineHighlightBorder': '#1a1a1a',

                // Selection
                'editor.selectionBackground': '#0004ff40',
                'editor.selectionHighlightBackground': '#0004ff20',
                'editor.inactiveSelectionBackground': '#0004ff15',
                'editor.selectionForeground': '#ffffff',

                // Cursor
                'editorCursor.foreground': '#0004ff',
                'editorCursor.background': '#0A0A0A',

                // Line numbers
                'editorLineNumber.foreground': '#333333',
                'editorLineNumber.activeForeground': '#E6EDF3',
                'editorLineNumber.dimmedForeground': '#222222',

                // Indent guides
                'editorIndentGuide.background': '#161616',
                'editorIndentGuide.activeBackground': '#2a2a2a',

                // Whitespace
                'editorWhitespace.foreground': '#1a1a1a',

                // Rulers
                'editorRuler.foreground': '#1a1a1a',

                // Brackets
                'editorBracketMatch.background': '#0004ff15',
                'editorBracketMatch.border': '#0004ff',

                // Overview ruler
                'editorOverviewRuler.border': '#0A0A0A',
                'editorOverviewRuler.background': '#0A0A0A',
                'editorOverviewRuler.findMatchForeground': '#0004ff',
                'editorOverviewRuler.selectionHighlightForeground': '#0004ff',

                // Gutter
                'editorGutter.background': '#0A0A0A',
                'editorGutter.modifiedBackground': '#0004ff',
                'editorGutter.addedBackground': '#0004ff',
                'editorGutter.deletedBackground': '#FF4444',
                'editorGutter.foldingControlForeground': '#555555',

                // Widgets
                'editorWidget.background': '#111111',
                'editorWidget.border': '#1a1a1a',
                'editorSuggestWidget.background': '#111111',
                'editorSuggestWidget.border': '#1a1a1a',
                'editorSuggestWidget.foreground': '#E6EDF3',
                'editorSuggestWidget.highlightForeground': '#0004ff',
                'editorSuggestWidget.selectedBackground': '#0004ff30',

                // Hover
                'editorHoverWidget.background': '#111111',
                'editorHoverWidget.border': '#1a1a1a',

                // Find
                'editor.findMatchBackground': '#0004ff40',
                'editor.findMatchHighlightBackground': '#0004ff20',
                'editor.findRangeHighlightBackground': '#0004ff15',

                // Links
                'editorLink.activeForeground': '#0004ff',

                // Folding
                'editor.foldBackground': '#111111',

                // Word highlight
                'editor.wordHighlightBackground': '#0004ff15',
                'editor.wordHighlightStrongBackground': '#0004ff25',

                // Symbol highlight
                'editor.symbolHighlightBackground': '#0004ff20',

                // Peek view
                'peekView.border': '#0004ff',
                'peekViewEditor.background': '#0A0A0A',
                'peekViewEditor.matchHighlightBackground': '#0004ff30',
                'peekViewResult.background': '#111111',
                'peekViewResult.matchHighlightBackground': '#0004ff30',

                // Merge conflicts
                'merge.currentHeaderBackground': '#0004ff20',
                'merge.incomingHeaderBackground': '#0004ff20',

                // Diff
                'diffEditor.insertedTextBackground': '#0004ff15',
                'diffEditor.removedTextBackground': '#FF444415',
              },
            });

            monaco.editor.setTheme('buildit-black');
          }}
        />
      </div>
    </div>
  );
}

function FileIcon({ language }: { language?: string }) {
  const colors: Record<string, string> = {
    typescript: 'text-[#79C0FF]',
    javascript: 'text-[#F1E05A]',
    json: 'text-[#A5D6FF]',
    markdown: 'text-[#E6EDF3]',
    html: 'text-[#E34C26]',
    css: 'text-[#563D7C]',
    python: 'text-[#3572A5]',
    plaintext: 'text-[#555555]',
  };
  return (
    <span className={`text-xs ${colors[language || 'plaintext']}`}>●</span>
  );
}
