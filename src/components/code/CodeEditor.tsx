'use client';

import Editor from '@monaco-editor/react';
import { useEditor } from '@/context/EditorProvider.context';
import { useRef } from 'react';
import type * as Monaco from 'monaco-types';
import { coloursManaco, rulesManaco } from '@/utils/Manaco';

export default function CodeEditor() {
  const { zoom, theme } = useEditor();

  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    console.log(value);
  };

  const handleEditorDidMount = (
    editor: Monaco.editor.IStandaloneCodeEditor,
    monaco: typeof Monaco
  ) => {
    editorRef.current = editor;

    monaco.editor.defineTheme('buildit-black', {
      base: 'vs-dark',
      inherit: true,
      rules: rulesManaco,
      colors: coloursManaco,
    });

    console.log('editor mounted');

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      handleEditorChange(value);
    });

    monaco.editor.setTheme('buildit-black');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language="javascript"
          value="// Select a file to start coding"
          theme={theme === 'vs-dark' ? 'buildit-black' : 'light'}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
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
        />
      </div>
    </div>
  );
}
