import { ProjectType } from './code-edittor/projects/projects.types';

export interface EditorContextType {
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  CodeValue: string;
  setCodeValue: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  output: string[];
  setOutput: (output: string[]) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  ProjectDetiles: ProjectType | null;
  setProjectDetiles: (project: ProjectType | null) => void;
}
