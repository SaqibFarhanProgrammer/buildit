'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'Ruby',
];

const roles = ['FrontEnd', 'Backend', 'Both'];

const experiences = [0, 1, 2, 3, 5, 7, 10];

const themes = ['Dark', 'Light'];

const codingLevels = ['Beginner', 'Intermediate', 'Expert'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    programmingLanguage: '',
    role: '',
    experience: 0,
    theme: '',
    codingLevel: '',
  });

  const steps = [
    {
      title: "What's your language?",
      subtitle: 'Select your primary programming language',
      field: 'programmingLanguage' as const,
      options: programmingLanguages,
    },
    {
      title: "What's your role?",
      subtitle: 'Choose your development focus',
      field: 'role' as const,
      options: roles,
    },
    {
      title: 'Years of experience?',
      subtitle: 'How long have you been coding?',
      field: 'experience' as const,
      options: experiences,
    },

    {
      title: 'Skill level?',
      subtitle: 'Rate your coding proficiency',
      field: 'codingLevel' as const,
      options: codingLevels,
    },
    {
      title: 'Preferred theme?',
      subtitle: 'Choose your editor theme',
      field: 'theme' as const,
      options: themes,
    },
  ];

  const currentStep = steps[step];

  const handleSelect = (value: string | number) => {
    setFormData((prev) => ({ ...prev, [currentStep.field]: value }));
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    router.push('/dashboard');
  };

  const isSelected = (option: string | number) => {
    return formData[currentStep.field] === option;
  };

  return (
    <div className="min-h-screen bg-white wf flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8 sm:mb-12">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                idx <= step ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]/10'
              }`}
            />
          ))}
        </div>

        <div className="mb-6 sm:mb-8">
          <span className="font-['inter-semi'] text-[10px] sm:text-xs text-[#0a0a0a]/30 uppercase tracking-[0.2em]">
            Step {step + 1} of {steps.length}
          </span>
        </div>

        <h1 className="font-['inter-bold'] text-3xl sm:text-4xl md:text-5xl text-[#0a0a0a] leading-[1.1] tracking-tight mb-3">
          {currentStep.title}
        </h1>
        <p className="font-['inter-rag'] text-sm sm:text-base text-[#0a0a0a]/40 mb-8 sm:mb-12 leading-relaxed">
          {currentStep.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {currentStep.options.map((option) => {
            const selected = isSelected(option);
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 ${
                  selected
                    ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-lg shadow-[#0a0a0a]/10'
                    : 'border-[#0a0a0a]/8 bg-white hover:border-[#0a0a0a]/20 hover:shadow-md hover:shadow-[#0a0a0a]/5 text-[#0a0a0a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-['inter-semi'] text-sm sm:text-base ${
                      selected ? 'text-white' : 'text-[#0a0a0a]'
                    }`}
                  >
                    {option}
                    {currentStep.field === 'experience' &&
                      option === 0 &&
                      ' (Newbie)'}
                    {currentStep.field === 'experience' &&
                      option === 10 &&
                      '+ years'}
                  </span>

                  {selected && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0004ff] flex items-center justify-center shrink-0 ml-3">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {currentStep.field === 'theme' && option === 'Dark' && (
                  <p
                    className={`font-['inter-light'] text-[10px] sm:text-xs mt-2 ${
                      selected ? 'text-white/50' : 'text-[#0a0a0a]/30'
                    }`}
                  >
                    Easy on the eyes
                  </p>
                )}
                {currentStep.field === 'role' && option === 'Both' && (
                  <p
                    className={`font-['inter-light'] text-[10px] sm:text-xs mt-2 ${
                      selected ? 'text-white/50' : 'text-[#0a0a0a]/30'
                    }`}
                  >
                    Full-stack development
                  </p>
                )}

                {currentStep.field === 'theme' && option === 'Light' && (
                  <p
                    className={`font-['inter-light'] text-[10px] sm:text-xs mt-2 ${
                      selected ? 'text-white/50' : 'text-[#0a0a0a]/30'
                    }`}
                  >
                    Clean & minimal
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#0a0a0a]/5">
          {step > 0 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="font-['inter-semi'] text-sm text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              Back
            </button>
          ) : (
            <div />
          )}

          {step === steps.length - 1 ? (
            <Link href="/">
              <button
                onClick={handleSubmit}
                className="font-['inter-semi'] bg-[#0a0a0a] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm hover:bg-[#0a0a0a]/90 transition-all hover:shadow-lg hover:shadow-[#0a0a0a]/20 active:scale-95"
              >
                Get Started →
              </button>
            </Link>
          ) : (
            <span className="font-['inter-light'] text-xs text-[#0a0a0a]/25">
              Select an option to continue
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
