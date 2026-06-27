import { languages } from '@/data/learning-data';
import LanguageCard from '@/components/learning/LanguageCard';
import { Language } from '@/types';

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#0a0a0a]/20" />
            <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
              Learning Platform
            </span>
          </div>

          <div className="max-w-2xl">
            <h1 className="font-['inter-bold'] text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0a0a0a]">
              Learn smarter with a <span className="text-[#0004ff]">clean</span>
              , professional interface.
            </h1>
            <p className="mt-4 font-['inter-rag'] text-sm leading-relaxed text-[#0a0a0a]/50 max-w-xl">
              Explore curated learning paths built for developers who want a
              polished and professional study flow with clean design and calm
              whitespace.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Ready in minutes',
                desc: 'Jump into lessons for JavaScript, TypeScript, Python, and Rust with clear overview cards.',
              },
              {
                title: 'Clean layout',
                desc: 'A calm interface that guides your focus to course content, videos, and code examples.',
              },
              {
                title: 'Blue accent',
                desc: 'Subtle blue highlights and clean typography create a professional look.',
              },
              {
                title: 'Focused learning',
                desc: 'Designed for quick discovery of lessons and code examples in a polished study workflow.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#0a0a0a]/5 bg-[#f9fafb] px-5 py-4 hover:border-[#0004ff]/10 transition-all duration-200"
              >
                <p className="font-['inter-semi'] text-[10px] uppercase tracking-[0.18em] text-[#0004ff]">
                  {feature.title}
                </p>
                <p className="mt-2 font-['inter-rag'] text-xs leading-relaxed text-[#0a0a0a]/40">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#0a0a0a]/20" />
                <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
                  Learn Path
                </span>
              </div>
              <h2 className="font-['inter-bold'] text-2xl sm:text-3xl tracking-tight text-[#0a0a0a]">
                Select your next{' '}
                <span className="text-[#0004ff]">skill path</span>
              </h2>
            </div>
            <p className="max-w-md font-['inter-rag'] text-xs leading-relaxed text-[#0a0a0a]/40">
              Browse beginner-friendly and advanced courses with clear
              descriptions, difficulty badges, and video counts.
            </p>
          </div>

          {/* Language Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {languages.map((lang: Language) => (
              <LanguageCard
                key={lang.slug}
                language={{
                  slug: lang.slug,
                  name: lang.name,
                  description: lang.description,
                  icon: lang.icon,
                  difficulty: lang.difficulty,
                  videoCount: lang.videos.length,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
