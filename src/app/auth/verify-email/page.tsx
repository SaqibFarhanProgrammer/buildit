'use client';

import { AppError } from '@/lib/AppError';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function VerifyEmailForm() {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SearchParams = useSearchParams();

  const EncodedEmail = SearchParams.get('e');

  if (!EncodedEmail) {
    throw new AppError('Email not Found inn Url', 400);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const fullCode = code.join('');

      if (fullCode.length !== 8) {
        setError('Please enter all 8 digits');
        return;
      }
      setLoading(true);

      await axios.post('/api/auth/verify-email', {
        email: EncodedEmail,
        code: fullCode,
      });

      router.push('/auth/complete-profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error);
      }
      setLoading(false);
    }
  };

  const isComplete = code.every((c) => c !== '');

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
            Verify your email
          </h1>

          <p className="text-sm font-['inter-rag'] text-[#6b7280] text-center mb-8">
            Enter the 8-digit code sent to your email
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              placeholder="00000000"
              value={code.join('')}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 8);
                const newCode = ['', '', '', '', '', '', '', ''];
                val.split('').forEach((d, i) => {
                  newCode[i] = d;
                });
                setCode(newCode);
                setError('');
              }}
              className="w-full h-14 text-center text-2xl font-['inter-semi'] text-black tracking-[0.5em] bg-white border border-black/10 rounded-xl focus:border-[#0004ff] focus:outline-none focus:ring-2 focus:ring-[#0004ff]/10 placeholder:text-black/20 transition-all mb-6"
            />

            {error && (
              <p className="text-sm font-['inter-semi'] text-red-500 text-center mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!isComplete || loading}
              className="w-full h-12 bg-black text-white font-['inter-semi'] text-sm rounded-xl hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Verifying...' : 'Verify email'}
            </button>
          </form>

          <p className="text-sm font-['inter-rag'] text-[#6b7280] text-center mt-6">
            Didn&apos;t receive code?{' '}
            <button className="font-['inter-semi'] text-black hover:text-[#0004ff] transition-colors">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyEmailForm />
    </Suspense>
  );
}
