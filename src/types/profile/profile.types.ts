export interface ProfileUser {
  name: string;
  username: string;
  email: string;
  image?: string;
  role: string;
  avatar: string;
  joinDate: string;
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
