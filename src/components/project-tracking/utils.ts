import { MemberDetailType, TaskT } from '@/types/project tracking/types';

export function getInitials(name?: string) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name?: string) {
  if (!name) return 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30';
  const colors = [
    'bg-[#0004ff]/10 text-[#0004ff]',
    'bg-emerald-100 text-emerald-600',
    'bg-amber-100 text-amber-600',
    'bg-rose-100 text-rose-600',
    'bg-purple-100 text-purple-600',
    'bg-cyan-100 text-cyan-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const BOARD_COLUMNS = [
  {
    id: 'TO DO' as const,
    label: 'TO DO',
    color: 'bg-[#0a0a0a]/[0.03]',
    headerColor: 'bg-[#0a0a0a]/[0.06]',
    badgeColor: 'bg-[#0a0a0a]/10 text-[#0a0a0a]/50',
    dotColor: 'bg-[#0a0a0a]/20',
    borderColor: 'border-[#0a0a0a]/5',
  },
  {
    id: 'IN PROGRESS' as const,
    label: 'IN PROGRESS',
    color: 'bg-[#0004ff]/[0.03]',
    headerColor: 'bg-[#0004ff]/[0.06]',
    badgeColor: 'bg-[#0004ff]/10 text-[#0004ff]',
    dotColor: 'bg-[#0004ff]',
    borderColor: 'border-[#0004ff]/10',
  },
  {
    id: 'HOLD' as const,
    label: 'HOLD',
    color: 'bg-amber-50/[0.5]',
    headerColor: 'bg-amber-100/[0.5]',
    badgeColor: 'bg-amber-100 text-amber-600',
    dotColor: 'bg-amber-500',
    borderColor: 'border-amber-200/50',
  },
  {
    id: 'DONE' as const,
    label: 'DONE',
    color: 'bg-emerald-50/[0.5]',
    headerColor: 'bg-emerald-100/[0.5]',
    badgeColor: 'bg-emerald-100 text-emerald-600',
    dotColor: 'bg-emerald-500',
    borderColor: 'border-emerald-200/50',
  },
];

export type TaskPersonDisplay = {
  name: string;
  image: string | null;
  initial: string;
  avatarColor: string;
};

export type TaskCardData = {
  id: string;
  title: string;
  summary: string;
  displayDate: string;
  isOverdue: boolean;
  creator: TaskPersonDisplay;
  assignee: TaskPersonDisplay | null;
};

export function formatTaskDate(
  dueDate: string | null,
  fallbackDate?: string | null
): string {
  const dateValue = dueDate ?? fallbackDate;
  if (!dateValue) return 'No date';

  return new Date(dateValue).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function isTaskOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

export function findMemberById(
  members: MemberDetailType[],
  userId: string | null | undefined
): MemberDetailType | undefined {
  if (!userId) return undefined;
  return members.find((m) => m.userId === userId);
}

function toPersonDisplay(
  name: string,
  image?: string | null
): TaskPersonDisplay {
  return {
    name,
    image: image || null,
    initial: getInitials(name),
    avatarColor: getAvatarColor(name),
  };
}

export function buildTaskCardData(
  task: TaskT,
  members: MemberDetailType[]
): TaskCardData {
  const assigneeMember = findMemberById(members, task.assignToMemberId);

  return {
    id: task._id,
    title: task.title,
    summary: task.summary,
    displayDate: formatTaskDate(task.dueDate, task.createdAt),
    isOverdue: isTaskOverdue(task.dueDate),
    creator: toPersonDisplay(task.createdByUserName, task.createdByUserImage),
    assignee: assigneeMember
      ? toPersonDisplay(assigneeMember.name, assigneeMember.image)
      : null,
  };
}

export function canManageTasks(role: string): boolean {
  return role === 'admin' || role === 'member';
}
