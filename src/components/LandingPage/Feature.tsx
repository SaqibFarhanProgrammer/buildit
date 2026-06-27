import Link from 'next/link';
import {
  RiCodeLine,
  RiBugLine,
  RiFlashlightLine,
  RiDashboardLine,
  RiBookOpenLine,
  RiTeamLine,
  RiArrowRightLine,
} from 'react-icons/ri';

const features = [
  {
    id: 1,
    title: 'AI Code Editor',
    description:
      'Write, debug, and optimize code with real-time AI assistance. Syntax highlighting, auto-completion, and intelligent suggestions built-in.',
    icon: RiCodeLine,
    tag: 'Editor',
  },
  {
    id: 2,
    title: 'Smart Debugging',
    description:
      'AI-powered error detection and contextual fix suggestions. Catch bugs before they ship with intelligent code analysis.',
    icon: RiBugLine,
    tag: 'Debug',
  },
  {
    id: 3,
    title: 'Coding Challenges',
    description:
      'Practice with competitive programming problems. Automated test cases, global rankings, and performance tracking included.',
    icon: RiFlashlightLine,
    tag: 'Practice',
  },
  {
    id: 4,
    title: 'Project Dashboard',
    description:
      'Kanban boards, task tracking, and productivity analytics. Monitor coding hours, daily streaks, and team performance.',
    icon: RiDashboardLine,
    tag: 'Manage',
  },
  {
    id: 5,
    title: 'Learning Paths',
    description:
      'Structured tutorials and blogs for every skill level. From beginner fundamentals to advanced system design concepts.',
    icon: RiBookOpenLine,
    tag: 'Learn',
  },
  {
    id: 6,
    title: 'Team Collaboration',
    description:
      'Real-time code sharing, pair programming, and integrated comments. Work together seamlessly in shared workspaces.',
    icon: RiTeamLine,
    tag: 'Collaborate',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28 md:py-36 bg-white overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Blue glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#0004ff]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight max-w-2xl">
            Everything you need to{' '}
            <span className="text-[#0004ff]">build and ship</span> faster.
          </h2>
          <p className="mt-5 text-base md:text-lg text-black/50 max-w-lg leading-relaxed font-['inter-rag']">
            A complete toolkit for modern developers. From writing your first
            line to deploying production code.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative p-7 md:p-8 rounded-2xl border border-black/[0.06] bg-white hover:border-[#0004ff]/20 hover:shadow-xl hover:shadow-[#0004ff]/[0.04] transition-all duration-300"
              >
                {/* Top row: Icon + Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-black/[0.04] text-black/50 group-hover:bg-[#0004ff] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-['inter-semi'] text-black/30 uppercase tracking-wider">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-['inter-semi'] text-[#0a0a0a] mb-2.5 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-black/50 leading-relaxed font-['inter-rag']">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-['inter-semi'] text-[#0004ff] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <span>Learn more</span>
                  <RiArrowRightLine className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
            <div>
              <h3 className="text-xl md:text-2xl font-['inter-semi'] text-white tracking-tight">
                Ready to start building?
              </h3>
              <p className="mt-2 text-sm text-white/40 font-['inter-rag']">
                Join 50,000+ developers shipping code faster.
              </p>
            </div>
            <Link
              href="/signup"
              className="shrink-0 bg-[#0004ff] text-white px-7 py-3 rounded-full text-sm font-['inter-semi'] hover:bg-[#0004ff]/90 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
