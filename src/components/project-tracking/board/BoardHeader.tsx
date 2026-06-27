'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { getAvatarColor, getInitials } from '../utils';
import { CgAdd } from 'react-icons/cg';
import AddMemberModal from '../AddMemberForm';
import { useParams } from 'next/navigation';
import { AppError } from '@/lib/AppError';
import { MemberDetailType } from '@/types/project tracking/types';
import { IoExitOutline } from 'react-icons/io5';

type Props = {
  title: string;
  isAdmin: string;
  members?: MemberDetailType[];
};

export default function BoardHeader({ title, isAdmin, members }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAddMemberFormIsOpen, setisAddMemberFormIsOpen] = useState(false);

  const params = useParams();

  const { slug } = params;

  if (!slug) {
    throw new AppError('slug not found in params', 401);
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
      {isAddMemberFormIsOpen && (
        <AddMemberModal
          projectid={slug?.toString()}
          isOpen={isAddMemberFormIsOpen}
          onClose={() => setisAddMemberFormIsOpen(false)}
        />
      )}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/projectmanage"
            className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 hover:text-[#0004ff] transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
        <h1 className="font-['inter-bold'] text-2xl sm:text-3xl tracking-tight text-[#0a0a0a]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center -space-x-2">
          {members?.map((member: MemberDetailType, i: number) => {
            return (
              <div
                key={i}
                className={`relative w-9 h-9 rounded-full border-2 ${member.role === 'admin' ? 'border-blue-500' : 'border-white '} overflow-hidden   shadow-sm`}
              >
                {member.image != '' ? (
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
            );
          })}
          <div className="w-9 h-9 rounded-full bg-[#f9fafb] border-2 border-white flex items-center justify-center text-[10px] font-['inter-semi'] text-[#0a0a0a]/40 shadow-sm">
            {members?.length}
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/10 hover:bg-white transition-all"
          >
            <FiMoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-20 bg-white rounded-xl border border-[#0a0a0a]/5 shadow-xl shadow-[#0a0a0a]/5 py-2 min-w-[180px] overflow-hidden">
              {isAdmin != 'viewer' && (
                <button
                  onClick={() => setisAddMemberFormIsOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
                >
                  <CgAdd size={14} className="text-[#0a0a0a]/30" />
                  Add Member
                </button>
              )}
              {isAdmin != 'viewer' && (
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
                >
                  <FiEdit2 size={14} className="text-[#0a0a0a]/30" />
                  Edit Project
                </button>
              )}

              {isAdmin != 'admin' && (
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full
                flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <IoExitOutline size={14} />
                  Leave Project
                </button>
              )}

              <div className="h-px bg-[#0a0a0a]/[0.03] mx-4 my-1" />
              {isAdmin === 'admin' && (
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full
              flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 size={14} />
                  Delete Project
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
