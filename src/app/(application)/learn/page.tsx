import { languages } from '@/data/learning-data';
import LanguageCard from '@/components/learning/LanguageCard';

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <span className="text-sm font-['inter-semi'] text-[#0004ff] tracking-wide uppercase">
          Learning Platform
        </span>
        <h1 className="text-5xl font-['inter'] text-black mt-4 mb-6">
          Master Your Craft
        </h1>
        <p className="text-lg text-[#6b7280] font-['inter-rag'] max-w-2xl">
          Curated learning paths for modern developers. From fundamentals to
          advanced patterns.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang) => (
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
      </section>
    </main>
  );
}
