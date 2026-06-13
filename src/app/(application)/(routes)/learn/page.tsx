import { languages } from '@/data/learning-data';
import LanguageCard from '@/components/learning/LanguageCard';
import { Language } from '@/types';

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden pt-24 pb-14 px-6">
        <div className="mx-auto max-w-7xl relative">
          <span className="inline-flex items-center rounded-full bg-[#f9fafb] px-4 py-1.5 text-xs font-['inter-semi'] uppercase tracking-[0.18em] text-[#0004ff]">
            Learning Platform
          </span>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-5xl font-['inter'] tracking-tight text-black sm:text-6xl">
              Learn smarter with a clean, professional interface.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6b7280]">
              Explore curated learning paths built for developers who want a
              polished and professional study flow with clean design and calm
              whitespace.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] border border-black/6 bg-[#f9fafb] px-6 py-5">
              <p className="text-sm font-['inter-semi'] uppercase tracking-[0.18em] text-[#0004ff]">
                Ready in minutes
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                Jump into lessons for JavaScript, TypeScript, Python, and Rust
                with clear overview cards.
              </p>
            </div>
            <div className="rounded-[28px] border border-black/6 bg-[#f9fafb] px-6 py-5">
              <p className="text-sm font-['inter-semi'] uppercase tracking-[0.18em] text-[#0004ff]">
                Clean layout
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                A calm interface that guides your focus to course content,
                videos, and code examples.
              </p>
            </div>
            <div className="rounded-[28px] border border-black/6 bg-[#f9fafb] px-6 py-5">
              <p className="text-sm font-['inter-semi'] uppercase tracking-[0.18em] text-[#0004ff]">
                Blue accent
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                Subtle blue highlights and clean typography create a
                professional look.
              </p>
            </div>
            <div className="rounded-[28px] border border-black/6 bg-[#f9fafb] px-6 py-5">
              <p className="text-sm font-['inter-semi'] uppercase tracking-[0.18em] text-[#0004ff]">
                Focused learning
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                Designed for quick discovery of lessons and code examples in a
                polished study workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#0004ff]">
                Learn path
              </p>
              <h2 className="mt-3 text-3xl font-['inter'] text-black">
                Select your next skill path
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#6b7280]">
              Browse beginner-friendly and advanced courses with clear
              descriptions, difficulty badges, and video counts.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
