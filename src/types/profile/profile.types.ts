export type CodingLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type UserRole =
  | 'Frontend'
  | 'Backend'
  | 'Fullstack'
  | 'DevOps'
  | 'Mobile';
export type AppTheme = 'Light' | 'Dark' | 'System';

export type UserProfileT = {
  codingLevel: CodingLevel;
  experience: string; // Kyunki data mein "1" string format mein hai
  programmingLanguage: string;
  role: UserRole;
  theme: AppTheme;
};

// 3. Main User Schema type
export interface UserDataT {
  email: string;
  image: string;
  name: string;
  profile: UserProfileT;
}

export interface WorkflowItem {
  id: number;
  title: string;
  desc: string;
  type: string;
  time: string;
  status: string;
}

export interface TaskItem {
  id: number;
  title: string;
  status: string;
  priority: string;
}

export interface StatItem {
  label: string;
  value: string;
  unit: string;
  trend: string;
}
