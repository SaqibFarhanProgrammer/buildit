import { Language } from '@/types/learning/learning.types';

export const languages: Language[] = [
  {
    slug: 'javascript',
    name: 'JavaScript',
    description:
      'The language of the web. Master ES6+, async programming, and modern patterns.',
    icon: '🟨',
    difficulty: 'Beginner',
    videos: [
      {
        id: 'js-1',
        title: 'Variables & Data Types',
        duration: '12:30',
        description: 'Learn let, const, and primitive types.',
      },
      {
        id: 'js-2',
        title: 'Functions & Scope',
        duration: '15:45',
        description: 'Arrow functions, closures, and lexical scope.',
      },
    ],
    codeExamples: [
      {
        title: 'Arrow Function',
        code: `const greet = (name) => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(greet('BuildIt'));`,
      },
      {
        title: 'Destructuring',
        code: `const user = { name: 'Ali', age: 25 };\nconst { name, age } = user;\n\nconsole.log(name, age);`,
      },
    ],
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    description:
      'Type-safe JavaScript. Interfaces, generics, and advanced type patterns.',
    icon: '🔷',
    difficulty: 'Intermediate',
    videos: [
      {
        id: 'ts-1',
        title: 'Types & Interfaces',
        duration: '14:20',
        description: 'Understanding the type system.',
      },
      {
        id: 'ts-2',
        title: 'Generics',
        duration: '18:10',
        description: 'Building reusable typed components.',
      },
    ],
    codeExamples: [
      {
        title: 'Interface',
        code: `interface User {\n  id: number;\n  name: string;\n}\n\nconst user: User = { id: 1, name: 'Ali' };`,
      },
      {
        title: 'Generic Function',
        code: `function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst output = identity<string>('BuildIt');`,
      },
    ],
  },
  {
    slug: 'python',
    name: 'Python',
    description:
      'Readable and powerful. Data structures, OOP, and scripting essentials.',
    icon: '🐍',
    difficulty: 'Beginner',
    videos: [
      {
        id: 'py-1',
        title: 'Lists & Dictionaries',
        duration: '11:15',
        description: 'Core data structures in Python.',
      },
      {
        id: 'py-2',
        title: 'Functions',
        duration: '13:40',
        description: 'Defining and calling functions.',
      },
    ],
    codeExamples: [
      {
        title: 'List Comprehension',
        code: `numbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers]\n\nprint(squares)`,
      },
      {
        title: 'Dictionary',
        code: `user = {'name': 'Ali', 'age': 25}\nprint(user['name'])`,
      },
    ],
  },
  {
    slug: 'rust',
    name: 'Rust',
    description:
      'Systems programming with safety. Ownership, borrowing, and concurrency.',
    icon: '🦀',
    difficulty: 'Advanced',
    videos: [
      {
        id: 'rs-1',
        title: 'Ownership Basics',
        duration: '16:50',
        description: 'Understanding memory ownership.',
      },
      {
        id: 'rs-2',
        title: 'Borrowing',
        duration: '14:30',
        description: 'References and lifetimes.',
      },
    ],
    codeExamples: [
      {
        title: 'Ownership',
        code: `let s1 = String::from("hello");\nlet s2 = s1;\n\n// println!("{}", s1); // Error!`,
      },
      {
        title: 'Struct',
        code: `struct User {\n    name: String,\n    age: u32,\n}\n\nlet user = User {\n    name: String::from("Ali"),\n    age: 25,\n};`,
      },
    ],
  },
];
