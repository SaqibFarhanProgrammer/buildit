import Link from 'next/link';

const features = [
  {
    id: 1,
    title: 'AI Code Editor',
    description:
      'Write, debug, and optimize code with real-time AI assistance. Syntax highlighting, auto-completion, and intelligent suggestions built-in.',
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
    tag: 'Editor',
  },
  {
    id: 2,
    title: 'Smart Debugging',
    description:
      'AI-powered error detection and contextual fix suggestions. Catch bugs before they ship with intelligent code analysis.',
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
    tag: 'Debug',
  },
  {
    id: 3,
    title: 'Coding Challenges',
    description:
      'Practice with competitive programming problems. Automated test cases, global rankings, and performance tracking included.',
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
    tag: 'Practice',
  },
  {
    id: 4,
    title: 'Project Dashboard',
    description:
      'Kanban boards, task tracking, and productivity analytics. Monitor coding hours, daily streaks, and team performance.',
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
    tag: 'Manage',
  },
  {
    id: 5,
    title: 'Learning Paths',
    description:
      'Structured tutorials and blogs for every skill level. From beginner fundamentals to advanced system design concepts.',
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    tag: 'Learn',
  },
  {
    id: 6,
    title: 'Team Collaboration',
    description:
      'Real-time code sharing, pair programming, and integrated comments. Work together seamlessly in shared workspaces.',
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
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    tag: 'Collaborate',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#0a0a0a]" />
          <span className="text-xs font-semibold text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
            Features
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[inter] text-[#0a0a0a] leading-tight -tracking-[2px] max-w-2xl">
          Everything you need to{' '}
          <span className="text-[#000]">build and ship</span> faster.
        </h2>
        <p className="mt-4 text-base text-black/60 max-w-lg leading-tight">
          A complete toolkit for modern developers. From writing your first line
          to deploying production code.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-6 md:p-7 rounded-2xl border border-[#0a0a0a]/5 bg-white hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0a0a0a]/[0.03] text-[#0a0a0a]/60 group-hover:bg-[#000] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-semibold text-[#0a0a0a]/30 uppercase tracking-wider">
                  {feature.tag}
                </span>
              </div>

              <h3 className="text-lg font-[inter] text-[#0a0a0a] mb-2 -tracking-[2px]">
                {feature.title}
              </h3>
              <p className="text-sm text-black/60 leading-tight">
                {feature.description}
              </p>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#000] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#000]/[0.04] rotate-45 transform origin-top-right" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 mt-16 md:mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-2xl bg-[#0a0a0a]">
          <div>
            <h3 className="text-xl md:text-2xl font-[inter] text-white -tracking-[1px]">
              Ready to start building?
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Join 50,000+ developers shipping code faster.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 bg-white text-[#0a0a0a] px-7 py-3 rounded-full text-sm font-[inter] hover:bg-white/90 transition-all duration-200"
          >
            Get Started Free →
          </Link>
        </div>
      </div>
    </section>
  );
}
