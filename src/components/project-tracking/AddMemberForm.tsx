'use client';

import { useState, useRef, useEffect } from 'react';
import {
  FiX,
  FiMail,
  FiUser,
  FiPlus,
  FiCheckCircle,
  FiSearch,
  FiUserPlus,
} from 'react-icons/fi';

export type MemberRole = 'admin' | 'member' | 'viewer';

export type MemberT = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: MemberRole;
};

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingMembers?: MemberT[];
}

const roleConfig: Record<
  MemberRole,
  { label: string; color: string; dot: string }
> = {
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
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
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

export default function AddMemberModal({
  isOpen,
  onClose,
  existingMembers = [],
}: AddMemberModalProps) {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<MemberRole>('member');
  const [emailError, setEmailError] = useState('');
  const [addedMembers, setAddedMembers] = useState<MemberT[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAdd = () => {};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleRemove = (id: string) => {
    setAddedMembers((prev) => prev.filter((m) => m.id !== id));
  };

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
            <div>
              <h2 className="font-['inter-bold'] text-lg text-[#0a0a0a]">
                Add Members
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

        <div className="px-6 py-5 space-y-5">
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
                ref={inputRef}
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                onKeyDown={handleKeyDown}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:bg-white transition-all ${
                  emailError
                    ? 'border-red-200 focus:border-red-300 bg-red-50/30'
                    : 'border-[#0a0a0a]/5 focus:border-[#0004FF]/50'
                }`}
              />
            </div>
            {emailError && (
              <p className="font-['inter-rag'] text-xs text-red-500 mt-1.5">
                {emailError}
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
                  onClick={() => setSelectedRole(role)}
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
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all"
          >
            <FiPlus size={16} />
            Invite Member
          </button>

          {(addedMembers.length > 0 || existingMembers.length > 0) && (
            <div className="h-px bg-[#0a0a0a]/[0.03]" />
          )}

          {existingMembers.length > 0 && (
            <div>
              <h3 className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-3">
                Existing Members ({existingMembers.length})
              </h3>
              <div className="space-y-2">
                {existingMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-[#0a0a0a]/5 shrink-0">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(member.name)}`}
                        >
                          {getInitials(member.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['inter-semi'] text-xs text-[#0a0a0a] truncate">
                        {member.name}
                      </p>
                      <p className="font-['inter-rag'] text-[10px] text-[#0a0a0a]/30 truncate">
                        {member.email}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-['inter-semi'] border ${roleConfig[member.role].color}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${roleConfig[member.role].dot}`}
                      />
                      {roleConfig[member.role].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {addedMembers.length > 0 && (
            <div>
              <h3 className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-3">
                Newly Invited ({addedMembers.length})
              </h3>
              <div className="space-y-2">
                {addedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0004ff]/[0.02] border border-[#0004ff]/10"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-[#0a0a0a]/5 shrink-0">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(member.name)}`}
                        >
                          {getInitials(member.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['inter-semi'] text-xs text-[#0a0a0a] truncate">
                        {member.email}
                      </p>
                      <p className="font-['inter-rag'] text-[10px] text-[#0a0a0a]/30">
                        Pending invitation
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-['inter-semi'] border ${roleConfig[member.role].color}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${roleConfig[member.role].dot}`}
                      />
                      {roleConfig[member.role].label}
                    </span>
                    <button
                      onClick={() => handleRemove(member.id)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[#0a0a0a]/20 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[#0a0a0a]/5">
          <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/30">
            {addedMembers.length} new invitation
            {addedMembers.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle save all members
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
