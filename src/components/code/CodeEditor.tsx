'use client';

import Editor from '@monaco-editor/react';
import { useEditor } from '@/context/EditorProvider.context';
import { useRef, useState } from 'react';
import { coloursManaco, rulesManaco } from '@/utils/Manaco';

export default function CodeEditor() {
  const { zoom, theme } = useEditor();
  const editorRef = useRef(null);
  const [isUserTyping, setisUserTyping] = useState(false);

  function handleUseristyping() {
    setisUserTyping(true);
  }
  // 1. Unified state update directly inside the onChange event handler
  const handleEditorChange = (value?: string) => {
    let once = true;
    if (isUserTyping) {
      setisUserTyping(true);
      once = false;
    }
    console.log('typing');

    const intervel = setInterval(() => {
      setisUserTyping(false);
      clearInterval(intervel);
    }, 5000);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Proper syntax highlighting with #0A0A0A background
    monaco.editor.defineTheme('buildit-black', {
      base: 'vs-dark',
      inherit: true,
      rules: rulesManaco,
      colors: coloursManaco,
    });
    console.log('c');

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      handleEditorChange(value);
    });
    // Reapply theme explicitly once defined
    monaco.editor.setTheme('buildit-black');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={activeFile?.language || 'javascript'}
          language={activeFile?.language || 'javascript'}
          value={activeFile?.content || '// Select a file to start coding'}
          theme={theme === 'vs-dark' ? 'buildit-black' : 'light'}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount} // Fixed reference call
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
