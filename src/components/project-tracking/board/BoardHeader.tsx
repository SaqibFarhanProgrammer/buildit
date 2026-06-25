'use client';

import { useState, useRef, useEffect } from 'react';
import {
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiArchive,
  FiShare2,
} from 'react-icons/fi';
import Link from 'next/link';
import { getAvatarColor, getInitials } from '../utils';
import { CgAdd } from 'react-icons/cg';
import AddMemberModal from '../AddMemberForm';
import { useParams } from 'next/navigation';
import { AppError } from '@/lib/AppError';

type Member = {
  id: string;
  name: string;
  image?: string;
};

type Props = {
  title: string;
  members?: Member[];
};

export default function BoardHeader({
  title,
  members = [
    {
      id: '1',
      name: 'Ali Huzaifa',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkimn9NedRZmEfUH52YESn50t2os4KWUePA&s',
    },
    { id: '2', name: 'Saqib Farhan', image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Muhammad Usman', image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Umer Farooq', image: 'https://i.pravatar.cc/150?u=4' },
  ],
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAddMemberFormIsOpen, setisAddMemberFormIsOpen] = useState(false);

  const params = useParams();

  const { slug } = params;

  if (!slug) {
    throw new AppError('slug not found in params', 401);
  }

  const handleImageError = (memberId: string) => {
    setImageErrors((prev) => ({ ...prev, [memberId]: true }));
  };

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
          {members.slice(0, 4).map((member) => {
            const hasError = imageErrors[member.id];
            return (
              <div
                key={member.id}
                className="relative w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm"
                title={member.name}
              >
                {member.image && !hasError ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(member.id)}
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
          {members.length > 4 && (
            <div className="w-9 h-9 rounded-full bg-[#f9fafb] border-2 border-white flex items-center justify-center text-[10px] font-['inter-semi'] text-[#0a0a0a]/40 shadow-sm">
              +{members.length - 4}
            </div>
          )}
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
              <button
                onClick={() => setisAddMemberFormIsOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
              >
                <CgAdd size={14} className="text-[#0a0a0a]/30" />
                Add Member
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
              >
                <FiEdit2 size={14} className="text-[#0a0a0a]/30" />
                Edit Project
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
              >
                <FiShare2 size={14} className="text-[#0a0a0a]/30" />
                Share
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-[#0a0a0a]/70 hover:bg-[#f9fafb] transition-colors"
              >
                <FiArchive size={14} className="text-[#0a0a0a]/30" />
                Archive
              </button>
              <div className="h-px bg-[#0a0a0a]/[0.03] mx-4 my-1" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-['inter-semi'] text-red-500 hover:bg-red-50 transition-colors"
              >
                <FiTrash2 size={14} />
                Delete Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
