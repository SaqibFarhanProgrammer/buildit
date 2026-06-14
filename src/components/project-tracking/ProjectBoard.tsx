'use client';

import { useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiMoreHorizontal,
  FiFilter,
} from 'react-icons/fi';
import AddTaskModal from './CreateNewTaskForm';

// Types
type TaskT = {
  _id: string;
  title: string;
  summary: string;
  createdUserid: string;
  projectid: string;
  createdByUserName: string;
  createdByUserImage?: string;
  state: 'not started' | 'in progress' | 'hold' | 'completed';
  assignToMemberId?: string;
  assignToMemberName?: string;
  assignToMemberImage?: string;
  createdAt?: string;
  subtasks?: { completed: number; total: number };
  taskId?: string;
};

type ProjectTrackingT = {
  _id: string;
  title: string;
  description: string;
  state: 'active' | 'archive';
  IsAdmin: boolean;
  YourhwereAdded: boolean;
  members: string[];
  tasks: TaskT[];
  createdByUserName: string;
  createdByUserImage?: string;
};

const project: ProjectTrackingT = {
  _id: 'projectId',
  title: 'E-Commerce Platform',
  description:
    'Full-stack e-commerce application with payment integration and admin dashboard.',
  state: 'active',
  IsAdmin: true,
  YourhwereAdded: true,
  members: ['user_1', 'user_2', 'user_3', 'user_4'],
  tasks: [
    {
      _id: 'task_1',
      title: 'Setup Authentication',
      summary:
        'Implement JWT-based authentication with refresh tokens and role-based access control.',
      createdUserid: 'user_1',
      projectid: 'projectId',
      createdByUserName: 'Ali Huzaifa',
      createdByUserImage: '',
      state: 'completed',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-15T10:00:00Z',
      subtasks: { completed: 3, total: 3 },
      taskId: 'NHP-12',
    },
    {
      _id: 'task_2',
      title: 'Design Database Schema',
      summary:
        'Create ER diagram and define tables for users, products, orders, and payments.',
      createdUserid: 'user_1',
      projectid: 'projectId',
      createdByUserName: 'Ali Huzaifa',
      createdByUserImage: '',
      state: 'completed',
      assignToMemberId: 'user_3',
      assignToMemberName: 'Muhammad Usman',
      assignToMemberImage: '',
      createdAt: '2024-01-16T10:00:00Z',
      subtasks: { completed: 2, total: 2 },
      taskId: 'NHP-14',
    },
    {
      _id: 'task_3',
      title: 'Build Product API',
      summary:
        'Create REST endpoints for product CRUD operations with image upload support.',
      createdUserid: 'user_2',
      projectid: 'projectId',
      createdByUserName: 'Saqib Farhan',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_3',
      assignToMemberName: 'Muhammad Usman',
      assignToMemberImage: '',
      createdAt: '2024-01-17T10:00:00Z',
      subtasks: { completed: 1, total: 4 },
      taskId: 'NHP-16',
    },
    {
      _id: 'task_4',
      title: 'Payment Integration',
      summary:
        'Integrate Stripe payment gateway with webhook handling for order confirmations.',
      createdUserid: 'user_1',
      projectid: 'projectId',
      createdByUserName: 'Ali Huzaifa',
      createdByUserImage: '',
      state: 'not started',
      assignToMemberId: 'user_4',
      assignToMemberName: 'Umer Farooq',
      assignToMemberImage: '',
      createdAt: '2024-01-18T10:00:00Z',
      subtasks: { completed: 0, total: 3 },
      taskId: 'NHP-18',
    },
    {
      _id: 'task_5',
      title: 'Admin Dashboard',
      summary:
        'Build admin panel with analytics charts, user management, and order tracking.',
      createdUserid: 'user_2',
      projectid: 'projectId',
      createdByUserName: 'Saqib Farhan',
      createdByUserImage: '',
      state: 'hold',
      assignToMemberId: 'user_1',
      assignToMemberName: 'Ali Huzaifa',
      assignToMemberImage: '',
      createdAt: '2024-01-19T10:00:00Z',
      subtasks: { completed: 2, total: 5 },
      taskId: 'NHP-20',
    },
    {
      _id: 'task_6',
      title: 'Email Notifications',
      summary:
        'Setup transactional emails for order confirmations, shipping updates, and password resets.',
      createdUserid: 'user_3',
      projectid: 'projectId',
      createdByUserName: 'Muhammad Usman',
      createdByUserImage: '',
      state: 'not started',
      assignToMemberId: undefined,
      assignToMemberName: undefined,
      assignToMemberImage: undefined,
      createdAt: '2024-01-20T10:00:00Z',
      subtasks: { completed: 0, total: 2 },
      taskId: 'NHP-22',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_7',
      title: 'User Profile Page',
      summary:
        'Create user profile page with avatar upload, bio editing, and activity history.',
      createdUserid: 'user_4',
      projectid: 'projectId',
      createdByUserName: 'Umer Farooq',
      createdByUserImage: '',
      state: 'in progress',
      assignToMemberId: 'user_2',
      assignToMemberName: 'Saqib Farhan',
      assignToMemberImage: '',
      createdAt: '2024-01-21T10:00:00Z',
      subtasks: { completed: 1, total: 3 },
      taskId: 'NHP-24',
    },
    {
      _id: 'task_8',
      title: 'SEO Optimization',
      summary:
        'Implement meta tags, sitemap generation, and structured data for better SEO.',
      createdUserid: 'user_3',
      projectid: 'projectId',
      createdByUserName: 'Muhammad Usman',
      createdByUserImage: '',
      state: 'hold',
      assignToMemberId: 'user_4',
      assignToMemberName: 'Umer Farooq',
      assignToMemberImage: '',
      createdAt: '2024-01-22T10:00:00Z',
      subtasks: { completed: 1, total: 4 },
      taskId: 'NHP-26',
    },
  ],
  createdByUserName: 'Ali Huzaifa',
  createdByUserImage: '',
};

const columns = [
  {
    id: 'not started',
    label: 'TO DO',
    color: 'bg-[#0a0a0a]/[0.03]',
    headerColor: 'bg-[#0a0a0a]/[0.06]',
    badgeColor: 'bg-[#0a0a0a]/10 text-[#0a0a0a]/50',
    dotColor: 'bg-[#0a0a0a]/20',
    borderColor: 'border-[#0a0a0a]/5',
  },
  {
    id: 'in progress',
    label: 'IN PROGRESS',
    color: 'bg-[#0004ff]/[0.03]',
    headerColor: 'bg-[#0004ff]/[0.06]',
    badgeColor: 'bg-[#0004ff]/10 text-[#0004ff]',
    dotColor: 'bg-[#0004ff]',
    borderColor: 'border-[#0004ff]/10',
  },
  {
    id: 'hold',
    label: 'HOLD',
    color: 'bg-amber-50/[0.5]',
    headerColor: 'bg-amber-100/[0.5]',
    badgeColor: 'bg-amber-100 text-amber-600',
    dotColor: 'bg-amber-500',
    borderColor: 'border-amber-200/50',
  },
  {
    id: 'completed',
    label: 'DONE',
    color: 'bg-emerald-50/[0.5]',
    headerColor: 'bg-emerald-100/[0.5]',
    badgeColor: 'bg-emerald-100 text-emerald-600',
    dotColor: 'bg-emerald-500',
    borderColor: 'border-emerald-200/50',
  },
] as const;

export default function ProjectBoard() {
  const [searchQuery, setSearchQuery] = useState('');

  const getTasksByState = (state: string) => {
    return project.tasks.filter(
      (t) =>
        t.state === state &&
        (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const taskCounts = {
    'not started': getTasksByState('not started').length,
    'in progress': getTasksByState('in progress').length,
    hold: getTasksByState('hold').length,
    completed: getTasksByState('completed').length,
  };
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
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
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 sm:py-12">
        <AddTaskModal />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#0a0a0a]/20" />
            <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
              Board
            </span>
          </div>
          <h1 className="font-['inter-bold'] text-2xl sm:text-3xl tracking-tight text-[#0a0a0a]">
            {project.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-2">
            {project.members.slice(0, 4).map((member, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(member)}`}
              >
                {getInitials(['Ali', 'Saqib', 'Usman', 'Umer'][idx] || member)}
              </div>
            ))}
            {project.members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-[#f9fafb] border-2 border-white flex items-center justify-center text-[10px] font-['inter-semi'] text-[#0a0a0a]/40">
                +{project.members.length - 4}
              </div>
            )}
          </div>

          <div className="relative w-64">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30"
              size={14}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f9fafb] border border-[#0a0a0a]/5 rounded-xl pl-9 pr-4 py-2 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-semi'] text-[#0a0a0a]/60 hover:bg-white transition-all">
            <FiFilter size={14} />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((column) => {
          const tasks = getTasksByState(column.id);
          return (
            <div key={column.id} className="flex flex-col">
              <div className={`flex items-center justify-between mb-3 px-1`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                  <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider">
                    {column.label}
                  </span>
                </div>
                <span
                  className={`font-['inter-semi'] text-[10px] px-2 py-0.5 rounded-md ${column.badgeColor}`}
                >
                  {taskCounts[column.id]}
                </span>
              </div>

              <div
                className={`flex-1 rounded-2xl p-3 ${column.color} min-h-[400px]`}
              >
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/20">
                      No tasks
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task._id}
                        className="group bg-white rounded-xl border border-[#0a0a0a]/5 border-[#0004ff]/20 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03] transition-all duration-200 p-4 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-[#0004ff]/10 flex items-center justify-center">
                              <FiCheckCircle
                                size={10}
                                className="text-[#0004ff]"
                              />
                            </div>
                            <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30">
                              {task.taskId}
                            </span>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0a0a0a]/20 hover:text-[#0a0a0a]/40">
                            <FiMoreHorizontal size={14} />
                          </button>
                        </div>

                        <h4 className="font-['inter-semi'] text-sm text-[#0a0a0a] mb-2 leading-snug group-hover:text-[#0004ff] transition-colors">
                          {task.title}
                        </h4>

                        <p className="font-['inter-rag'] text-[11px] text-[#0a0a0a]/35 leading-relaxed mb-3 line-clamp-2">
                          {task.summary}
                        </p>

                        {task.subtasks && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-4 h-4 rounded bg-[#0004ff]/10 flex items-center justify-center">
                              <FiCheckCircle
                                size={10}
                                className="text-[#0004ff]"
                              />
                            </div>
                            <span className="font-['inter-rag'] text-[10px] text-[#0a0a0a]/30">
                              {task.subtasks.completed}/{task.subtasks.total}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-[#0a0a0a]/[0.03]">
                          <div className="flex items-center gap-1.5">
                            <FiClock size={10} className="text-[#0a0a0a]/20" />
                            <span className="font-['inter-rag'] text-[9px] text-[#0a0a0a]/25">
                              {task.createdAt
                                ? new Date(task.createdAt).toLocaleDateString(
                                    'en-US',
                                    { month: 'short', day: 'numeric' }
                                  )
                                : 'No date'}
                            </span>
                          </div>

                          {task.assignToMemberName ? (
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-['inter-semi'] ${getAvatarColor(task.assignToMemberName)}`}
                              title={task.assignToMemberName}
                            >
                              {getInitials(task.assignToMemberName)}
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-[#f9fafb] border border-dashed border-[#0a0a0a]/10 flex items-center justify-center">
                              <FiUser size={10} className="text-[#0a0a0a]/15" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {project.IsAdmin && (
                  <button className="w-full mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/50 border border-dashed border-[#0a0a0a]/10 hover:border-[#0004ff]/30 hover:bg-white transition-all group">
                    <FiPlus
                      size={14}
                      className="text-[#0a0a0a]/20 group-hover:text-[#0004ff] transition-colors"
                    />
                    <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/30 group-hover:text-[#0004ff] transition-colors">
                      Create
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
