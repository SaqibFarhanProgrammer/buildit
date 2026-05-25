'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UiError, setUiError] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const value = searchParams.get('e');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post('/api/auth/setpassword', {
        password,
        email: value,
      });

      router.push('/profile');

      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message;
      }

      setUiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 -mt-16">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-['inter-bold'] text-sm">B</span>
            </div>

            <span className="font-['inter-bold'] text-xl text-black">
              BuildIt
            </span>
          </div>

          <h1 className="text-2xl font-['inter-bold'] text-black text-center mb-2">
            Change your password
          </h1>

          <p className="text-sm font-['inter-rag'] text-[#6b7280] text-center mb-8">
            Create a strong password for your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-12 px-4 pr-16 text-sm font-['inter-rag'] text-black bg-white border border-black/10 rounded-xl focus:border-[#0004ff] focus:outline-none focus:ring-2 focus:ring-[#0004ff]/10 placeholder:text-[#6b7280]/40 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-['inter-semi'] text-[#6b7280] hover:text-black transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-['inter-semi'] text-black mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full h-12 px-4 pr-16 text-sm font-['inter-rag'] text-black bg-white border border-black/10 rounded-xl focus:border-[#0004ff] focus:outline-none focus:ring-2 focus:ring-[#0004ff]/10 placeholder:text-[#6b7280]/40 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-['inter-semi'] text-[#6b7280] hover:text-black transition-colors"
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <p className="text-red-500">{UiError}</p>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black text-white font-['inter-semi'] text-sm rounded-xl hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all mt-2"
            >
              {loading ? 'Setting password...' : 'Set password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
