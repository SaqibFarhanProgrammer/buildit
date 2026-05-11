'use client';

import { useState } from 'react';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: 'Alex Chen',
    username: 'alexchen',
    email: 'alex@buildit.dev',
    bio: 'Building scalable apps with TypeScript & Node.js.',
    location: 'San Francisco, CA',
    website: 'https://alexchen.dev',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-['inter-bold'] text-xl text-[#0a0a0a] tracking-tight mb-1">
          Profile Information
        </h2>
        <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
          Update your public profile details.
        </p>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl border border-[#0a0a0a]/5 bg-[#f9fafb]">
        <div className="w-16 h-16 rounded-xl bg-[#0a0a0a] flex items-center justify-center">
          <span className="font-['inter-bold'] text-xl text-white">AC</span>
        </div>
        <div>
          <button
            type="button"
            className="font-['inter-semi'] text-xs bg-[#0a0a0a] text-white px-4 py-2 rounded-lg hover:bg-[#0a0a0a]/90 transition-all"
          >
            Change Avatar
          </button>
          <p className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 mt-1">
            JPG, PNG or GIF. Max 2MB.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004ff] transition-all"
          />
        </div>
        <div>
          <label className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004ff] transition-all"
          />
        </div>
      </div>

      <div>
        <label className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004ff] transition-all"
        />
      </div>

      <div>
        <label className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          rows={3}
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004ff] transition-all resize-none"
        />
        <p className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 mt-1 text-right">
          {formData.bio.length}/160
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
            Location
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004ff] transition-all"
          />
        </div>
        <div>
          <label className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
            Website
          </label>
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004ff] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#0a0a0a]/5">
        <button
          type="submit"
          className="font-['inter-semi'] text-sm bg-[#0a0a0a] text-white px-6 py-2.5 rounded-lg hover:bg-[#0a0a0a]/90 transition-all"
        >
          Save Changes
        </button>
        {saved && (
          <span className="font-['inter-semi'] text-xs text-green-600 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Saved successfully
          </span>
        )}
      </div>
    </form>
  );
}
