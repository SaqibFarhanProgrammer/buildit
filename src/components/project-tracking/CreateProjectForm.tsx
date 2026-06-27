'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { ProjectTrackingT } from '@/types/project tracking/types';
import axios from 'axios';
import { useState } from 'react';
import {
  FiX,
  FiFolder,
  FiUsers,
  FiAlignLeft,
  FiCheckCircle,
} from 'react-icons/fi';

type ErrorState = Record<string, string>;

export default function CreateProjectForm() {
  const { isCreateModalOpen, closeCreateModal, addProject } =
    useProjectTrackingContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState<'active' | 'archive'>('active');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [errors, setErrors] = useState<ErrorState>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isCreateModalOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setState('active');
    setSelectedMembers([]);
    setInviteEmail('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    closeCreateModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ErrorState = {};

    if (!title.trim()) newErrors.title = 'Project name is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('/api/projecttracking/create-project', {
        title: title.trim(),
        description: description.trim(),
        state,
        members: {},
      });

      if (!res.data.project) {
        throw new Error('No project returned from API');
      }

      addProject(res.data.project as ProjectTrackingT);
      resetForm();
    } catch (error) {
      console.error('CREATE_PROJECT_TRACKING_ERROR:', error);
      setErrors({
        form: 'Unable to create project. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0a0a0a]/5">
          <div>
            <h2 className="font-['inter-bold'] text-lg text-[#0a0a0a]">
              Create Project
            </h2>
            <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-0.5">
              Start a new project and invite your team
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#f9fafb] flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Project Name
            </label>
            <div className="relative">
              <FiFolder
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/20"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder="Enter project name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
              />
            </div>
            {errors.title && (
              <p className="text-xs text-red-500 mt-1.5 font-['inter-rag']">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Description
            </label>
            <div className="relative">
              <FiAlignLeft
                size={14}
                className="absolute left-3 top-3 text-[#0a0a0a]/20"
              />
              <textarea
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: '' }));
                }}
                placeholder="Describe your project..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all resize-none"
              />
            </div>
            {errors.description && (
              <p className="text-xs text-red-500 mt-1.5 font-['inter-rag']">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Invite by Email
            </label>
            <div className="relative">
              <FiUsers
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/20"
              />
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Initial Status
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setState('active')}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-['inter-semi'] border transition-all ${
                  state === 'active'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30 border-[#0a0a0a]/5'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-2 ${
                    state === 'active' ? 'bg-emerald-500' : 'bg-[#0a0a0a]/20'
                  }`}
                />
                Active
              </button>
              <button
                type="button"
                onClick={() => setState('archive')}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-['inter-semi'] border transition-all ${
                  state === 'archive'
                    ? 'bg-[#0a0a0a]/10 text-[#0a0a0a]/60 border-[#0a0a0a]/10'
                    : 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30 border-[#0a0a0a]/5'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-2 ${
                    state === 'archive' ? 'bg-[#0a0a0a]/40' : 'bg-[#0a0a0a]/20'
                  }`}
                />
                Archive
              </button>
            </div>
          </div>

          {errors.form && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-500 font-['inter-rag']">
                {errors.form}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#0a0a0a]/5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <FiCheckCircle size={14} />
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
