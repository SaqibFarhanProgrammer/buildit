export interface EditorFile {
  id: string;
  name: string;
  language?: string;
  content?: string;
  isFolder?: boolean;
  children?: EditorFile[];
  isOpen?: boolean;
}

export interface EditorContextType {
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  activeFile: EditorFile | null;
  setActiveFile: (file: EditorFile | null) => void;
}
