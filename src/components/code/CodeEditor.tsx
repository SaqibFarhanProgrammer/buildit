'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { useEditor } from '@/context/EditorProvider.context';
import { useEffect, useRef, useState } from 'react';
import type * as Monaco from 'monaco-types';
import { coloursManaco, rulesManaco } from '@/utils/Manaco';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function CodeEditor() {
  const searchParams = useSearchParams();
  async function GetProjectcontent() {
    const id = searchParams.get('id');
    try {
      const res = await axios.get(
        `/api/codeproject/get-project-content?id=${id}`
      );
      return res.data.content;
    } catch (error) {
      console.error(error);
    }
  }

  const { zoom, theme } = useEditor();
  const [ValueEdittor, setValueEdittor] = useState<string>('');

  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange = (value: string | undefined): void => {
    if (value) {
      setValueEdittor(value);
    }
  };

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.editor.defineTheme('buildit-black', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: coloursManaco,
    });

    monacoInstance.editor.setTheme('buildit-black');

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      handleEditorChange(value);
    });
  };
  useEffect(() => {
    GetProjectcontent().then((content) => {
      setValueEdittor(content);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language="javascript"
          value={ValueEdittor}
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
