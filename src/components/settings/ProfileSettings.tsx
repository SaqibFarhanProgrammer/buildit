'use client';

import { useRef, useState } from 'react';

export default function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: 'Alex Chen',
    username: 'alexchen',
    email: 'alex@buildit.dev',
    bio: 'Building scalable apps with TypeScript & Node.js. Open source contributor.',
    location: '',
    website: 'https://alexchen.dev',
  });

  const initials = formData.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  async function onPickAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxBytes = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Only JPG, PNG, GIF or WEBP images are allowed.');
      e.target.value = '';
      return;
    }

    if (file.size > maxBytes) {
      setErrorMessage('Image size must be less than 2MB.');
      e.target.value = '';
      return;
    }

    setUploading(true);
    setSaved(false);
    setErrorMessage('');

    try {
      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/profile/avatar', {
        method: 'POST',
        body,
      });

      const json = (await res.json()) as { imageUrl?: string; message?: string };

      if (!res.ok) {
        throw new Error(json.message || 'Upload failed');
      }

      if (json.imageUrl) setAvatarUrl(json.imageUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setErrorMessage(message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="font-['inter-bold'] text-xl sm:text-2xl text-[#0a0a0a] tracking-tight mb-1">
          Profile Information
        </h2>
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
          Update your public profile details.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl border border-[#0a0a0a]/5 bg-[#f9fafb]">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0a0a0a] flex items-center justify-center shrink-0">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <span className="font-['inter-bold'] text-2xl sm:text-3xl text-white">
                {initials || 'U'}
              </span>
            )}
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickAvatarFile}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="font-['inter-semi'] text-xs sm:text-sm bg-[#0a0a0a] text-white px-5 py-2.5 rounded-lg hover:bg-[#0a0a0a]/90 transition-all"
            >
              {uploading ? 'Uploading...' : 'Change Avatar'}
            </button>
            <p className="font-['inter-light'] text-[10px] sm:text-xs text-[#0a0a0a]/30 mt-2">
              JPG, PNG or GIF. Max 2MB.
            </p>
            {errorMessage ? (
              <p className="font-['inter-semi'] text-xs text-red-600 mt-2">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/8 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004ff] transition-all"
            />
          </div>
          <div>
            <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/8 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004ff] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/8 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004ff] transition-all"
          />
        </div>

        <div>
          <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/8 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004ff] transition-all resize-none"
          />
          <p className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 mt-1.5 text-right">
            {formData.bio.length}/160
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/8 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004ff] transition-all"
            />
          </div>
          <div>
            <label className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/60 uppercase tracking-wider block mb-2">
              Website
            </label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/8 bg-white text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004ff] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-[#0a0a0a]/5">
        <button
          type="submit"
          className="font-['inter-semi'] text-sm bg-[#0a0a0a] text-white px-6 py-3 rounded-xl hover:bg-[#0a0a0a]/90 transition-all"
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
