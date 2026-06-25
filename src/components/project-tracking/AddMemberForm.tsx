'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiX, FiMail, FiPlus, FiCheckCircle, FiUserPlus } from 'react-icons/fi';
import axios from 'axios';

export type MemberRole = 'admin' | 'member' | 'viewer';

const memberSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  role: z.enum(['admin', 'member', 'viewer']),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface AddMemberModalProps {
  isOpen: boolean;
  projectid: string;
  onClose: () => void;
  onSubmit?: (data: MemberFormData) => void;
}

const roleConfig = {
  admin: {
    label: 'Admin',
    color: 'bg-[#0004ff]/5 text-[#0004ff] border-[#0004ff]/10',
    dot: 'bg-[#0004ff]',
  },
  member: {
    label: 'Member',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    dot: 'bg-emerald-500',
  },
  viewer: {
    label: 'Viewer',
    color: 'bg-[#0a0a0a]/5 text-[#0a0a0a]/50 border-[#0a0a0a]/5',
    dot: 'bg-[#0a0a0a]/20',
  },
} as const;

export default function AddMemberModal({
  isOpen,
  onClose,
  projectid,
}: AddMemberModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [UiError, setUiError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      email: '',
      role: 'member',
    },
  });

  const selectedRole = watch('role');

  async function handleFormSubmit(data: MemberFormData) {
    setShowSuccess(true);

    try {
      const res = await axios.post('/api/projecttracking/addmember', {
        projectiD: projectid,
        UserEmail: data.email,
        MemberRole: data.role,
      });
    } catch (error) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message;
      }

      setUiError(message);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#0a0a0a]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0004ff]/10 flex items-center justify-center">
              <FiUserPlus size={18} className="text-[#0004ff]" />
            </div>
            <div>
              <h2 className="font-['inter-bold'] text-lg text-[#0a0a0a]">
                Add Member
              </h2>
              <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-0.5">
                Invite by email address
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#f9fafb] flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-5 space-y-5"
        >
          {showSuccess && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <FiCheckCircle size={14} className="text-emerald-500 shrink-0" />
              <span className="font-['inter-semi'] text-xs text-emerald-600">
                Member invited successfully
              </span>
            </div>
          )}

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <FiMail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/20"
              />
              <input
                {...register('email')}
                type="email"
                placeholder="name@company.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:bg-white transition-all ${
                  errors.email
                    ? 'border-red-200 focus:border-red-300 bg-red-50/30'
                    : 'border-[#0a0a0a]/5 focus:border-[#0004FF]/50'
                }`}
              />
            </div>
            <p className="text-red-400 pt-2 font-[inter-rag]">{UiError}</p>
            {errors.email && (
              <p className="font-['inter-rag'] text-xs text-red-500 mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Role
            </label>
            <div className="flex items-center gap-2">
              {(Object.keys(roleConfig) as MemberRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setValue('role', role)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-['inter-semi'] transition-all border ${
                    selectedRole === role
                      ? roleConfig[role].color
                      : 'bg-[#f9fafb] border-[#0a0a0a]/5 text-[#0a0a0a]/40 hover:text-[#0a0a0a]/60'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${roleConfig[role].dot}`}
                  />
                  {roleConfig[role].label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all"
          >
            <FiPlus size={16} />
            Invite Member
          </button>
        </form>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#0a0a0a]/5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
