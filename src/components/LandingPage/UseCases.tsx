import Image from 'next/image';

export default function UseCases() {
  return (
    <section>
      <section
        id="use-cases"
        className="relative py-20 md:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight tracking-tight mb-4">
            The AI-native code editor
          </h2>
          <p className="text-base md:text-lg text-[#0a0a0a]/50 leading-relaxed max-w-xl mx-auto">
            Built to make you extraordinarily productive, BuildIt is the best
            way to code with AI.
          </p>
        </div>

        <div className="w-[90%] md:w-[80%] mx-auto mb-12 md:mb-16">
          <div className="relative rounded-xl overflow-hidden border border-[#0a0a0a]/10 shadow-2xl shadow-[#0a0a0a]/10">

            <div className="relative aspect-[16/9] bg-[#0a0a0a]">
              <Image
                src="/mnt/agents/upload/image(1).png"
                alt="BuildIt AI Code Editor Interface"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm md:text-base text-[#0a0a0a]/40 font-medium">
            Trusted every day by teams that build world-class software
          </p>
        </div>
      </section>

      <section
        id="dashboard"
        className="relative py-20 md:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight tracking-tight mb-4">
            Your productivity{' '}
            <span className="text-[#000]">command center</span>
          </h2>
          <p className="text-base md:text-lg text-[#0a0a0a]/50 leading-relaxed max-w-xl mx-auto">
            Track projects, monitor coding streaks, and manage your entire
            developer workflow from one unified dashboard.
          </p>
        </div>

        <div className="w-[90%] md:w-[80%] mx-auto mb-12 md:mb-16">
          <div className="relative rounded-xl overflow-hidden border border-[#0a0a0a]/10 shadow-2xl shadow-[#0a0a0a]/10">

            <div className="relative aspect-[16/9] bg-[#0a0a0a]">
              <img
                src="https://design4users.com/wp-content/uploads/2025/05/dashboard-financial-product.jpg"
                alt="BuildIt Developer Dashboard Interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm md:text-base text-[#0a0a0a]/40 font-medium">
            Trusted every day by developers shipping world-class products
          </p>
        </div>
      </section>

      <section
        id="dashboard"
        className="relative py-20 md:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight tracking-tight mb-4">
            Ship projects with <span className="text-[#000]">confidancee</span>
          </h2>
          <p className="text-base md:text-lg text-[#0a0a0a]/50 leading-relaxed max-w-xl mx-auto">
            Kanban boards, sprint planning, and real-time progress tracking.
            Manage tasks, hit deadlines, and keep your team aligned — all
            without leaving your editor.
          </p>
        </div>

        <div className="w-[90%] md:w-[80%] mx-auto mb-12 md:mb-16">
          <div className="relative rounded-xl overflow-hidden border border-[#0a0a0a]/10 shadow-2xl shadow-[#0a0a0a]/10">

            <div className="relative aspect-[16/9] bg-[#0a0a0a]">
              <img
                src="https://community.atlassian.com/forums/image/serverpage/image-id/72166i659DC4F29880DC84?v=v2"
                alt="BuildIt Developer Dashboard Interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm md:text-base text-[#0a0a0a]/40 font-medium">
            From sprint planning to shipping — everything in one place
          </p>
        </div>
      </section>
      <section
        id="ai-explainer"
        className="relative py-20 md:py-28 bg-[#f9fafb] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#000]/5 border border-[#000]/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#000]" />
                <span className="text-[#000] text-[10px] font-bold uppercase tracking-wider">
                  AI Explainer
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0a0a0a] leading-tight tracking-tight mb-4">
                Understand code <span className="text-[#000]">instantly</span>
              </h2>

              <p className="text-base text-[#0a0a0a]/50 leading-relaxed mb-6 max-w-md">
                Select any code block and get AI-generated explanations in plain
                English. Complex algorithms, legacy code, or new frameworks —
                understand everything with one click.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    One-click code explanation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Plain English breakdowns
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Works with any language
                  </span>
                </li>
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#000] hover:gap-3 transition-all duration-200"
              >
                <span>Try AI Explainer</span>
                <svg
                  className="w-4 h-4"
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
              </a>
            </div>

            <div className="w-full lg:w-[55%] shrink-0">
              <div className="relative rounded-xl overflow-hidden border border-[#0a0a0a]/10 shadow-xl shadow-[#0a0a0a]/5 bg-[#0a0a0a]">
                <div className="relative aspect-[16/10]">
                  <img
                    src="https://www.gstatic.com/bricks/image/4bb72519-deec-43aa-bb39-f58bc68e6f55.png"
                    alt="BuildIt AI Code Explainer Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="coding-challenges"
        className="relative py-20 md:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#000]/5 border border-[#000]/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#000]" />
                <span className="text-[#000] text-[10px] font-bold uppercase tracking-wider">
                  Coding Challenges
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0a0a0a] leading-tight tracking-tight mb-4">
                Level up your{' '}
                <span className="text-[#000]">problem solving</span>
              </h2>

              <p className="text-base text-[#0a0a0a]/50 leading-relaxed mb-6 max-w-md">
                Practice with competitive programming problems, track your
                progress, and climb global rankings. From easy warmups to hard
                system design — master every concept.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    500+ problems across all difficulty levels
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Automated test cases & instant feedback
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Global leaderboard & performance history
                  </span>
                </li>
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#000] hover:gap-3 transition-all duration-200"
              >
                <span>Start Practicing</span>
                <svg
                  className="w-4 h-4"
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
              </a>
            </div>

            <div className="w-full lg:w-[55%] shrink-0">
              <div className="relative rounded-xl overflow-hidden border border-[#0a0a0a]/10 shadow-xl shadow-[#0a0a0a]/5 bg-[#0a0a0a]">

                <div className="relative aspect-[16/10]">
                  <img
                    src="https://cdn.dribbble.com/userupload/16612909/file/original-657583e1aaf77903f05f141d3de41b56.png?format=webp&resize=400x300&vertical=center"
                    alt="BuildIt Coding Challenges Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="learning-platform"
        className="relative py-20 md:py-28 bg-[#f9fafb] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">

            <div className="w-full lg:w-[55%] shrink-0">
              <div className="relative rounded-xl overflow-hidden border border-[#0a0a0a]/10 shadow-xl shadow-[#0a0a0a]/5 bg-[#0a0a0a]">

                <div className="relative aspect-[16/10]">
                  <img
                    src="https://framerusercontent.com/images/5zQRt35Mjj4AdNmGwNuPUf791pU.png?width=2400&height=1128"
                    alt="BuildIt Learning Platform Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#000]/5 border border-[#000]/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#000]" />
                <span className="text-[#000] text-[10px] font-bold uppercase tracking-wider">
                  Learning Platform
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0a0a0a] leading-tight tracking-tight mb-4">
                Master skills <span className="text-[#000]">step by step</span>
              </h2>

              <p className="text-base text-[#0a0a0a]/50 leading-relaxed mb-6 max-w-md">
                Structured tutorials, interactive lessons, and hands-on
                projects. From beginner fundamentals to advanced system design —
                learn at your own pace.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Curated learning paths for every level
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Interactive code playgrounds
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#000]"
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
                  <span className="text-sm text-[#0a0a0a]/60">
                    Progress tracking & certificates
                  </span>
                </li>
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#000] hover:gap-3 transition-all duration-200"
              >
                <span>Start Learning</span>
                <svg
                  className="w-4 h-4"
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
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
