'use client';

import { ProjectType } from '@/types/code-edittor/projects/projects.types';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { languagesMap } from '../../../../data';
import { FiChevronDown } from 'react-icons/fi';

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (project: ProjectType) => void;
}

type ErrorSate = Record<string, string>;

const languageList = Object.entries(languagesMap).map(([key, value]) => ({
  key,
  name: value.name,
}));

export default function NewProjectModal({
  onClose,
  onCreate,
}: NewProjectModalProps) {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<ErrorSate>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Project name required';
    if (!description.trim()) newErrors.description = 'Description required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('/api/codeproject/create-project', {
        name: name.trim(),
        description: description.trim(),
        language,
        CreatedUserid: '12345',
      });

      if (!res.data.project) {
        throw new Error('No project returned from API');
      }

      onCreate({
        _id: res.data.project._id?.toString?.() || res.data.project._id || '',
        name: res.data.project.name || name.trim(),
        language: res.data.project.language || language,
        description: res.data.project.description || description.trim(),
        state: res.data.project.state || 'active',
        CreatedUserid: res.data.project.CreatedUserid || '12345',
        createdAt: res.data.project.createdAt || new Date().toISOString(),
      });

      onClose();
    } catch (error) {
      console.error('CREATE_PROJECT_ERROR:', error);
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="font-['inter-bold'] text-xl text-white">
            Create New Project
          </h2>
          <p className="font-['inter-rag'] text-xs text-white/30 mt-1">
            Set up your new coding project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block font-['inter-semi'] text-xs text-white/60 mb-2 uppercase tracking-wider">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. E-Commerce API"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#0004ff] transition-all font-['inter-rag']"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1.5 font-['inter-rag']">
                {errors.name}
              </p>
            )}
          </div>

          <div ref={dropdownRef} className="relative">
            <label className="block font-['inter-semi'] text-xs text-white/60 mb-2 uppercase tracking-wider">
              Language
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:border-white/20 focus:outline-none focus:border-[#0004ff] transition-all font-['inter-rag'] flex items-center justify-between group"
            >
              <span>{languageList.find((l) => l.key === language)?.name || language}</span>
              <FiChevronDown
                className={`w-4 h-4 text-white/40 group-hover:text-white/60 transition-all ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F0F0F] border border-white/10 rounded-lg shadow-xl z-50 max-h-56 overflow-y-auto">
                {languageList.map((lang, idx) => (
                  <button
                    key={lang.key}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.key);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-['inter-rag'] transition-all border-b border-white/5 last:border-b-0 ${
                      language === lang.key
                        ? 'bg-[#0004ff]/20 text-[#0004ff] border-l-2 border-l-[#0004ff]'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-['inter-semi'] text-xs text-white/60 mb-2 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description)
                  setErrors((prev) => ({ ...prev, description: '' }));
              }}
              placeholder="What does this project do?"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#0004ff] transition-all font-['inter-rag'] resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-400 mt-1.5 font-['inter-rag']">
                {errors.description}
              </p>
            )}
          </div>

          {errors.form && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-red-400 font-['inter-rag']">
                {errors.form}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-['inter-semi'] text-white/60 hover:bg-white/5 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#0004ff] text-sm font-['inter-semi'] text-white hover:bg-[#0004ff]/90 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
