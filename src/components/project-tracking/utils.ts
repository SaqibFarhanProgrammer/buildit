export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string) {
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
    id: 'not started' as const,
    label: 'TO DO',
    color: 'bg-[#0a0a0a]/[0.03]',
    headerColor: 'bg-[#0a0a0a]/[0.06]',
    badgeColor: 'bg-[#0a0a0a]/10 text-[#0a0a0a]/50',
    dotColor: 'bg-[#0a0a0a]/20',
    borderColor: 'border-[#0a0a0a]/5',
  },
  {
    id: 'in progress' as const,
    label: 'IN PROGRESS',
    color: 'bg-[#0004ff]/[0.03]',
    headerColor: 'bg-[#0004ff]/[0.06]',
    badgeColor: 'bg-[#0004ff]/10 text-[#0004ff]',
    dotColor: 'bg-[#0004ff]',
    borderColor: 'border-[#0004ff]/10',
  },
  {
    id: 'hold' as const,
    label: 'HOLD',
    color: 'bg-amber-50/[0.5]',
    headerColor: 'bg-amber-100/[0.5]',
    badgeColor: 'bg-amber-100 text-amber-600',
    dotColor: 'bg-amber-500',
    borderColor: 'border-amber-200/50',
  },
  {
    id: 'completed' as const,
    label: 'DONE',
    color: 'bg-emerald-50/[0.5]',
    headerColor: 'bg-emerald-100/[0.5]',
    badgeColor: 'bg-emerald-100 text-emerald-600',
    dotColor: 'bg-emerald-500',
    borderColor: 'border-emerald-200/50',
  },
];
