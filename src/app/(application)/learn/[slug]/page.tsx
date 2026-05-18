import Link from 'next/link';
import { languages } from '@/data/learning-data';
import VideoCard from '@/components/learning/VideoCard';
import CodeBlock from '@/components/learning/CodeExample';
import { FaArrowLeft } from 'react-icons/fa';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function LanguageDetailPage({ params }: PageProps) {
  const slug = await params.slug;
  const language = languages.find((l) => l.slug === slug);

  if (!language) {
    return (
      <main className="min-h-screen bg-[#fff9e6] flex items-center justify-center">
        <div className="rounded-[28px] border border-[#f0df9c] bg-white px-10 py-12 text-center shadow-[0_20px_70px_-34px_rgba(149,118,27,0.35)]">
          <h1 className="text-4xl font-['inter'] text-[#1c1b1d] mb-4">
            Language Not Found
          </h1>
          <Link
            href="/learning"
            className="inline-flex rounded-full bg-[#fff4b8] px-4 py-2 text-sm font-semibold text-[#7a5800] transition hover:bg-[#f7dd49]"
          >
            Back to Learning
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff9e6]">
      <section className="relative overflow-hidden pt-24 pb-16 px-6">
        <div className="absolute left-1/2 top-0 h-72 w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(252,211,77,0.3),transparent_55%)] blur-3xl" />
        <div className="mx-auto max-w-7xl relative">
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 rounded-full bg-[#fff4b8] px-4 py-2 text-sm font-['inter-semi'] text-[#7a5800] transition hover:bg-[#f7dd49]"
          >
            <FaArrowLeft size={14} />
            Back to Learning
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#fff4b8] text-5xl text-[#7a5800]">
                  {language.icon}
                </span>
                <div>
                  <h1 className="text-5xl font-['inter'] text-[#1c1b1d] sm:text-6xl">
                    {language.name}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5c5343]">
                    {language.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-12">
                <span className="rounded-full border border-[#f0df9c] bg-[#fff6c8] px-4 py-2 text-sm font-['inter-semi'] text-[#7a5800]">
                  {language.difficulty}
                </span>
                <span className="rounded-full border border-[#f0df9c] bg-[#fff6c8] px-4 py-2 text-sm font-['inter-semi'] text-[#7a5800]">
                  {language.videos.length} Videos
                </span>
                <span className="rounded-full border border-[#f0df9c] bg-[#fff6c8] px-4 py-2 text-sm font-['inter-semi'] text-[#7a5800]">
                  {language.codeExamples.length} Examples
                </span>
              </div>
            </div>

            <aside className="rounded-[28px] border border-[#f0df9c] bg-white px-6 py-7 shadow-[0_25px_60px_-40px_rgba(149,118,27,0.25)]">
              <p className="text-sm uppercase tracking-[0.18em] text-[#7a5800]">
                Course overview
              </p>
              <div className="mt-6 space-y-4 text-[#5c5343]">
                <div className="rounded-3xl bg-[#fff4b8]/80 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7a5800]">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-medium">Develop modern coding skills with polished lessons and examples.</p>
                </div>
                <div className="rounded-3xl bg-[#f8f2d4] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7a5800]">
                    Flow
                  </p>
                  <p className="mt-2 text-sm font-medium">Easy navigation between video lessons and code walkthroughs.</p>
                </div>
                <div className="rounded-3xl bg-[#fff4b8]/80 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7a5800]">
                    Style
                  </p>
                  <p className="mt-2 text-sm font-medium">Warm yellow accents balanced with clean white space.</p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-['inter-bold'] text-[#1c1b1d] mb-8">
              Course Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {language.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            <h2 className="text-3xl font-['inter-bold'] text-[#1c1b1d] mb-8">
              Code Examples
            </h2>
            <div className="space-y-6">
              {language.codeExamples.map((example, i) => (
                <CodeBlock
                  key={i}
                  title={example.title}
                  code={example.code}
                  language={language.name}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
