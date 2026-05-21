'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length !== 8) {
      setError('Please enter all 8 digits');
      return;
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const isComplete = code.every((c) => c !== '');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-['inter-semi'] text-[#6b7280] hover:text-black transition-colors"
        >
          <FaArrowLeft size={14} />
          back to home
        </Link>
      </div>

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
