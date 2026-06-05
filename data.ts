type LanguageT ={
  monaco: string;
  judge0: number;
  name: string;
}


export const languagesMap: { [key: string]: LanguageT } = {
  assembly: {
    monaco: 'ini',
    judge0: 45,
    name: 'Assembly (NASM 2.14.02)',
  },
  bash: {
    monaco: 'shell',
    judge0: 46,
    name: 'Bash (5.0.0)',
  },
  c: {
    monaco: 'c',
    judge0: 50,
    name: 'C (GCC 9.2.0)',
  },
  cpp: {
    monaco: 'cpp',
    judge0: 54,
    name: 'C++ (GCC 9.2.0)',
  },
  csharp: {
    monaco: 'csharp',
    judge0: 51,
    name: 'C# (Mono 6.6.0.161)',
  },
  clojure: {
    monaco: 'clojure',
    judge0: 86,
    name: 'Clojure (1.10.1)',
  },
  elixir: {
    monaco: 'elixir',
    judge0: 57,
    name: 'Elixir (1.9.4)',
  },
  fsharp: {
    monaco: 'fsharp',
    judge0: 87,
    name: 'F# (.NET Core SDK 3.1.202)',
  },
  go: {
    monaco: 'go',
    judge0: 60,
    name: 'Go (1.13.5)',
  },
  java: {
    monaco: 'java',
    judge0: 62,
    name: 'Java (OpenJDK 13.0.1)',
  },
  javascript: {
    monaco: 'javascript',
    judge0: 63,
    name: 'JavaScript (Node.js 12.14.0)',
  },
  kotlin: {
    monaco: 'kotlin',
    judge0: 78,
    name: 'Kotlin (1.3.70)',
  },
  lua: {
    monaco: 'lua',
    judge0: 64,
    name: 'Lua (5.3.5)',
  },
  objectivec: {
    monaco: 'objective-c',
    judge0: 79,
    name: 'Objective-C (Clang 7.0.1)',
  },
  pascal: {
    monaco: 'pascal',
    judge0: 67,
    name: 'Pascal (FPC 3.0.4)',
  },
  perl: {
    monaco: 'perl',
    judge0: 85,
    name: 'Perl (5.30.0)',
  },
  php: {
    monaco: 'php',
    judge0: 68,
    name: 'PHP (7.4.1)',
  },
  python: {
    monaco: 'python',
    judge0: 71,
    name: 'Python (3.8.1)',
  },
  r: {
    monaco: 'r',
    judge0: 80,
    name: 'R (4.0.0)',
  },
  ruby: {
    monaco: 'ruby',
    judge0: 72,
    name: 'Ruby (2.7.0)',
  },
  rust: {
    monaco: 'rust',
    judge0: 73,
    name: 'Rust (1.40.0)',
  },
  scala: {
    monaco: 'scala',
    judge0: 81,
    name: 'Scala (2.13.2)',
  },
  sql: {
    monaco: 'sql',
    judge0: 82,
    name: 'SQL (SQLite 3.31.1)',
  },
  swift: {
    monaco: 'swift',
    judge0: 83,
    name: 'Swift (5.2.3)',
  },
  typescript: {
    monaco: 'typescript',
    judge0: 74,
    name: 'TypeScript (3.7.4)',
  },
  vbnet: {
    monaco: 'vb',
    judge0: 84,
    name: 'Visual Basic.NET (vbnc 0.0.0.5943)',
  },
};
