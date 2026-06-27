'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { useEditor } from '@/context/EditorProvider.context';
import { useEffect, useRef } from 'react';
import * as Monaco from 'monaco-types';
import { coloursManaco } from '@/utils/Manaco';
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
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const {
    zoom,
    theme,
    CodeValue,
    setCodeValue,
    language,
    setLanguage,
    setProjectDetiles,
  } = useEditor();

  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange = (value: string | undefined): void => {
    if (value) {
      setCodeValue(value);
    }
  };

  const handleEditorDidMount: OnMount = (editor: any, monacoInstance: any) => {
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
    GetProjectcontent().then((project) => {
      if (!project) return;
      if (typeof project.content === 'string') {
        setCodeValue(project.content);
      }
      if (typeof project.language === 'string') {
        setLanguage(project.language);
      }
      setProjectDetiles(project);
    });
  }, [setCodeValue, setLanguage, setProjectDetiles]);

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language.toLowerCase()}
          language={language.toLowerCase()}
          value={CodeValue}
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
