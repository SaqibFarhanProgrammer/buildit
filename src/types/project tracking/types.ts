import { MemberType } from '@/models/project traccking/project-tracking.models';
import { TaskState } from '@/models/project traccking/task-tracking.models';

export type TaskT = {
  _id: string;
  title: string;
  summary: string;
  state: TaskState;
  assignToMemberId: string | null;
  dueDate: string | null;
  createdAt: string;
  createdByUserName: string;
  createdByUserImage: string;
};

export type ProjectTrackingT = {
  _id?: string;
  title: string;
  description: string;
  state: 'active' | 'archive';
  createdByUserId: string;
  members: MemberType[];
  isAdmin: boolean;
  createdAt: string;
  updatedAt?: string;
};

export interface ITaskCard {
  taskId: string;
  title: string;
  summary: string;
  dueDate: string | null;
  assignToMemberId: string | null;
  state: TaskState;
  createdAt: string;
}

export type MemberDetailType = {
  image: string;
  name: string;
  role: string;
  userId: string;
};
