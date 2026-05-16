export interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
}

export interface CodeExample {
  title: string;
  code: string;
}

export interface Language {
  slug: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  videos: Video[];
  codeExamples: CodeExample[];
}
