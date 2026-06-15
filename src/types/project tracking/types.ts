export type TaskState = 'not started' | 'in progress' | 'hold' | 'completed';

export type TaskT = {
  _id: string;
  title: string;
  summary: string;
  createdUserid: string;
  projectid: string;
  createdByUserName: string;
  createdByUserImage?: string;
  state: TaskState;
  assignToMemberId?: string;
  assignToMemberName?: string;
  assignToMemberImage?: string;
  dueDate?: string;
  taskId: string;
  createdAt?: string;
};

export type MemberDetailT = {
  id: string;
  name: string;
  image?: string;
};

export type ProjectTrackingT = {
  _id: string;
  title: string;
  description: string;
  state: 'active' | 'archive';
  IsAdmin: boolean;
  YourhwereAdded: boolean;
  members: string[];
  tasks: string[];
  createdByUserName: string;
  createdByUserImage?: string;
};

export type ProjectDetailT = Omit<ProjectTrackingT, 'tasks'> & {
  tasks: TaskT[];
  memberDetails: MemberDetailT[];
};
