'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { useForm } from 'react-hook-form';

import { SiGithub } from 'react-icons/si';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-[#000] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <span className="text-[#0a0a0a] font-bold text-lg">BuildIt</span>
          </Link>
          <h1 className="text-xl font-[inter4-medium] text-[#0a0a0a]">
            Welcome back
          </h1>
          <p className="text-sm font-[inter4-medium] text-[#0a0a0a]/40 mt-1">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-[inter4-medium] text-[#0a0a0a]/60 mb-1.5">
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#000] transition-all"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-[inter4-medium]   text-[#0a0a0a]/60 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-[#0a0a0a]/10 bg-white text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#000] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30 text-xs font-medium hover:text-[#0a0a0a]/50"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#000] text-white py-2.5 rounded-lg text-sm font-mediumbold hover:bg-[#000]/90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-[#0a0a0a]/5" />
          <span className="text-xs text-[#0a0a0a]/30">or</span>
          <div className="flex-1 h-[1px] bg-[#0a0a0a]/5" />
        </div>
        <div className="gap-2 flex flex-col">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#0a0a0a]/40 text-sm font-medium text-[#0a0a0a]/70 hover:bg-[#0a0a0a]/[0.02] transition-all">
            <SiGithub className="text-xl" />
            Continue with Github
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#0a0a0a]/40 text-sm font-medium text-[#0a0a0a]/70 hover:bg-[#0a0a0a]/[0.02] transition-all">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-[#0a0a0a]/40 mt-6">
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-[#000] font-[inter4-medium] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
