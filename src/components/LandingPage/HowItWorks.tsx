import Link from 'next/link';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Write Code',
    description:
      'Open the AI-powered Monaco editor. Syntax highlighting, auto-completion, and intelligent suggestions work out of the box. Write in any language you prefer.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    number: '02',
    title: 'AI Assists',
    description:
      'Get real-time debugging, code explanation, and optimization suggestions. The AI understands your context and helps you write better code faster.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    number: '03',
    title: 'Practice & Compete',
    description:
      'Solve coding challenges across difficulty levels. Track your progress, climb global rankings, and prepare for technical interviews with confidence.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    number: '04',
    title: 'Ship & Track',
    description:
      'Manage projects with Kanban boards, monitor productivity metrics, and maintain your coding streak. Deploy faster with everything in one place.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#0a0a0a]" />
          <span className="text-xs font-semibold text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
            How It Works
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[inter] text-[#0a0a0a] leading-tight -tracking-[2px] max-w-2xl">
          Four steps to <span className="text-[#000]">ship faster</span>.
        </h2>
        <p className="mt-4 font-[inter4-medium] text-[#0a0a0a]/80 max-w-lg leading-tight">
          From your first line of code to production deployment. A streamlined
          workflow built for modern developers.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group relative p-8 md:p-10 border-[#0a0a0a]/5 ${
                index % 2 === 0 ? 'md:border-r' : ''
              } ${index < 2 ? 'md:border-b' : ''} border-b last:border-b-0 md:last:border-b-0`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl md:text-6xl font-[inter] text-[#0a0a0a]/[0.06] leading-none -tracking-[3px] group-hover:text-[#000]/10 transition-colors duration-300">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0a0a0a]/[0.03] text-[#0a0a0a]/60 group-hover:bg-[#000] group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-[inter] text-[#0a0a0a] mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#0a0a0a]/60 leading-tight max-w-sm">
                {step.description}
              </p>

              <div className="mt-8 w-12 h-[2px] bg-[#0a0a0a]/10 group-hover:bg-[#000] group-hover:w-20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 mt-16 md:mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 rounded-2xl border border-[#0a0a0a]/5 bg-white">
          <p className="text-sm text-[#0a0a0a]/80">
            Start shipping in under 2 minutes. No setup required.
          </p>
          <Link
            href="/signup"
            className="shrink-0 bg-[#0a0a0a] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0a0a0a]/90 transition-all duration-200"
          >
            Start Building →
          </Link>
        </div>
      </div>
    </section>
  );
}
