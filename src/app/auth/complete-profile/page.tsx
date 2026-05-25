'use client';

import { useForm, Controller } from 'react-hook-form';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  CodingLevel,
  ThemeType,
  UserProfile,
  UserRole,
} from '@/models/User.model';
import { useState } from 'react';

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'Ruby',
];

const roles: UserRole[] = ['FrontEnd', 'Backend', 'Both'];

const experiences = [0, 1, 2, 3, 5, 7, 10];

const themes: { value: ThemeType; label: string; icon: string }[] = [
  { value: 'Dark', label: 'Dark Mode', icon: '🌙' },
  { value: 'Light', label: 'Light Mode', icon: '☀️' },
];

const levels: CodingLevel[] = ['Beginner', 'Intermediate', 'Expert'];

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState('');
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserProfile>({
    mode: 'onChange',
    defaultValues: {
      programmingLanguage: '',
      role: 'FrontEnd',
      experience: '0',
      theme: undefined as unknown as ThemeType,
      codingLevel: undefined as unknown as CodingLevel,
    },
  });

  const onSubmit = async (data: UserProfile) => {
    setLoading(true);
    setUiError('');

    try {
      const res = await axios.post('/api/auth/complete-profile', data);
      router.push('/profile');
    } catch (error) {
      setLoading(false);
      let message = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message;
      }
      setUiError(message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-['inter-bold'] text-sm">B</span>
            </div>
            <span className="font-['inter-bold'] text-xl text-black">
              BuildIt
            </span>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-['inter-bold'] text-black mb-2">
              Complete your profile
            </h1>
            <p className="text-sm font-['inter-rag'] text-[#6b7280]">
              Tell us about yourself to personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Programming Language */}
            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-3">
                Primary Programming Language
              </label>
              <Controller
                name="programmingLanguage"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => field.onChange(lang)}
                        className={`relative px-4 py-3 rounded-xl text-sm font-['inter-semi'] text-center border transition-all ${
                          field.value === lang
                            ? 'bg-[#0004ff] text-white border-[#0004ff]'
                            : 'bg-white text-black border-black/10 hover:border-[#0004ff]/30'
                        }`}
                      >
                        {lang}
                        {field.value === lang && (
                          <FaCheck
                            size={10}
                            className="absolute top-2 right-2"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-3">
                Your Role
              </label>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    {roles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => field.onChange(role)}
                        className={`px-5 py-2.5 rounded-full text-sm font-['inter-semi'] border transition-all ${
                          field.value === role
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10 hover:border-black/30'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-3">
                Years of Experience
              </label>
              <Controller
                name="experience"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    {experiences.map((years) => (
                      <button
                        key={years}
                        type="button"
                        onClick={() => field.onChange(years)}
                        className={`w-16 h-12 rounded-xl text-sm font-['inter-semi'] border transition-all ${
                          (field.value as string) === years
                            ? 'bg-[#0004ff] text-white border-[#0004ff]'
                            : 'bg-white text-black border-black/10 hover:border-[#0004ff]/30'
                        }`}
                      >
                        {years === 0 ? '0' : `${years}+`}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Coding Level */}
            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-3">
                Coding Level
              </label>
              <Controller
                name="codingLevel"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-3">
                    {levels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => field.onChange(level)}
                        className={`px-4 py-3 rounded-xl text-sm font-['inter-semi'] text-center border transition-all ${
                          field.value === level
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10 hover:border-black/30'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-3">
                Preferred Theme
              </label>
              <Controller
                name="theme"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-4">
                    {themes.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => field.onChange(t.value)}
                        className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all ${
                          field.value === t.value
                            ? 'bg-[#f9fafb] border-[#0004ff]'
                            : 'bg-white border-black/10 hover:border-black/20'
                        }`}
                      >
                        <span className="text-2xl">{t.icon}</span>
                        <div className="text-left">
                          <p className="text-sm font-['inter-semi'] text-black">
                            {t.label}
                          </p>
                        </div>
                        {field.value === t.value && (
                          <FaCheck
                            size={14}
                            className="text-[#0004ff] ml-auto"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {uiError && (
              <p className="text-sm font-['inter-semi'] text-red-500 text-center">
                {uiError}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || loading}
              className="w-full h-12 bg-black text-white font-['inter-semi'] text-sm rounded-xl hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Saving...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
