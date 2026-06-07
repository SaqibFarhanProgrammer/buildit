import Image from 'next/image';
import { RiCheckLine, RiArrowRightLine } from 'react-icons/ri';

export default function UseCases() {
  return (
    <section>
      <section
        id="use-cases"
        className="relative py-24 md:py-32 bg-white overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0004ff]" />
            <span className="text-[11px] font-['inter-semi'] text-[#0004ff] uppercase tracking-[0.2em]">
              Editor
            </span>
            <div className="w-8 h-px bg-[#0004ff]" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight mb-5">
            The AI-native code editor
          </h2>
          <p className="text-base md:text-lg text-black/50 max-w-xl mx-auto leading-relaxed font-['inter-rag']">
            Built to make you extraordinarily productive, BuildIt is the best
            way to code with AI.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 mb-12 md:mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-b from-[#0004ff]/[0.06] to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xl shadow-black/5 bg-[#0a0a0a]">
            <Image
              src="/editor-preview.png"
              alt="BuildIt AI Code Editor Interface"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-black/30 font-['inter-semi']">
            Trusted every day by teams that build world-class software
          </p>
        </div>
      </section>

      <section
        id="dashboard"
        className="relative py-24 md:py-32 bg-white overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0004ff]" />
            <span className="text-[11px] font-['inter-semi'] text-[#0004ff] uppercase tracking-[0.2em]">
              Dashboard
            </span>
            <div className="w-8 h-px bg-[#0004ff]" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight mb-5">
            Your productivity command center
          </h2>
          <p className="text-base md:text-lg text-black/50 max-w-xl mx-auto leading-relaxed font-['inter-rag']">
            Track projects, monitor coding streaks, and manage your entire
            developer workflow from one unified dashboard.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 mb-12 md:mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-b from-[#0004ff]/[0.06] to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xl shadow-black/5 bg-[#0a0a0a]">
            <Image
              src="/dashboard-preview.png"
              alt="BuildIt Developer Dashboard Interface"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-black/30 font-['inter-semi']">
            Trusted every day by developers shipping world-class products
          </p>
        </div>
      </section>

      <section
        id="project-tracking"
        className="relative py-24 md:py-32 bg-white overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0004ff]" />
            <span className="text-[11px] font-['inter-semi'] text-[#0004ff] uppercase tracking-[0.2em]">
              Tracking
            </span>
            <div className="w-8 h-px bg-[#0004ff]" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight mb-5">
            Ship projects with{' '}
            <span className="text-[#0004ff]">confidence</span>
          </h2>
          <p className="text-base md:text-lg text-black/50 max-w-xl mx-auto leading-relaxed font-['inter-rag']">
            Kanban boards, sprint planning, and real-time progress tracking.
            Manage tasks, hit deadlines, and keep your team aligned.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 mb-12 md:mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-b from-[#0004ff]/[0.06] to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xl shadow-black/5 bg-[#0a0a0a]">
            <Image
              src="/tracking-preview.png"
              alt="BuildIt Project Tracking Interface"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-black/30 font-['inter-semi']">
            From sprint planning to shipping — everything in one place
          </p>
        </div>
      </section>

      <section
        id="ai-explainer"
        className="relative py-24 md:py-32 bg-[#f9fafb] overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0004ff]" />
                <span className="text-[10px] font-['inter-semi'] text-black/50 uppercase tracking-wider">
                  AI Explainer
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight mb-5">
                Understand code{' '}
                <span className="text-[#0004ff]">instantly</span>
              </h2>

              <p className="text-base text-black/50 leading-relaxed mb-8 max-w-md font-['inter-rag']">
                Select any code block and get AI-generated explanations in plain
                English. Complex algorithms, legacy code, or new frameworks —
                understand everything with one click.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'One-click code explanation',
                  'Plain English breakdowns',
                  'Works with any language',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0004ff]/10 flex items-center justify-center shrink-0">
                      <RiCheckLine className="w-3 h-3 text-[#0004ff]" />
                    </div>
                    <span className="text-sm text-black/60 font-['inter-rag']">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-['inter-semi'] text-[#0004ff] hover:gap-3 transition-all duration-200"
              >
                <span>Try AI Explainer</span>
                <RiArrowRightLine className="w-4 h-4" />
              </a>
            </div>

            <div className="w-full lg:w-[55%] shrink-0">
              <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-xl shadow-black/5 bg-[#0a0a0a]">
                <Image
                  src="/ai-explainer-preview.png"
                  alt="BuildIt AI Code Explainer Interface"
                  width={700}
                  height={438}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="coding-challenges"
        className="relative py-24 md:py-32 bg-white overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0004ff]" />
                <span className="text-[10px] font-['inter-semi'] text-black/50 uppercase tracking-wider">
                  Coding Challenges
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight mb-5">
                Level up your{' '}
                <span className="text-[#0004ff]">problem solving</span>
              </h2>

              <p className="text-base text-black/50 leading-relaxed mb-8 max-w-md font-['inter-rag']">
                Practice with competitive programming problems, track your
                progress, and climb global rankings. From easy warmups to hard
                system design.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  '500+ problems across all difficulty levels',
                  'Automated test cases & instant feedback',
                  'Global leaderboard & performance history',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0004ff]/10 flex items-center justify-center shrink-0">
                      <RiCheckLine className="w-3 h-3 text-[#0004ff]" />
                    </div>
                    <span className="text-sm text-black/60 font-['inter-rag']">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-['inter-semi'] text-[#0004ff] hover:gap-3 transition-all duration-200"
              >
                <span>Start Practicing</span>
                <RiArrowRightLine className="w-4 h-4" />
              </a>
            </div>

            <div className="w-full lg:w-[55%] shrink-0">
              <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-xl shadow-black/5 bg-[#0a0a0a]">
                <Image
                  src="/challenges-preview.png"
                  alt="BuildIt Coding Challenges Interface"
                  width={700}
                  height={438}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="learning-platform"
        className="relative py-24 md:py-32 bg-[#f9fafb] overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0004ff]" />
                <span className="text-[10px] font-['inter-semi'] text-black/50 uppercase tracking-wider">
                  Learning Platform
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-['inter4-medium'] text-[#0a0a0a] leading-[1.1] tracking-tight mb-5">
                Master skills{' '}
                <span className="text-[#0004ff]">step by step</span>
              </h2>

              <p className="text-base text-black/50 leading-relaxed mb-8 max-w-md font-['inter-rag']">
                Structured tutorials, interactive lessons, and hands-on
                projects. From beginner fundamentals to advanced system design.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Curated learning paths for every level',
                  'Interactive code playgrounds',
                  'Progress tracking & certificates',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0004ff]/10 flex items-center justify-center shrink-0">
                      <RiCheckLine className="w-3 h-3 text-[#0004ff]" />
                    </div>
                    <span className="text-sm text-black/60 font-['inter-rag']">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-['inter-semi'] text-[#0004ff] hover:gap-3 transition-all duration-200"
              >
                <span>Start Learning</span>
                <RiArrowRightLine className="w-4 h-4" />
              </a>
            </div>

            <div className="w-full lg:w-[55%] shrink-0">
              <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-xl shadow-black/5 bg-[#0a0a0a]">
                <Image
                  src="/learning-preview.png"
                  alt="BuildIt Learning Platform Interface"
                  width={700}
                  height={438}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
