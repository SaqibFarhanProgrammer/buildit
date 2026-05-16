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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-['inter'] text-black mb-4">
            Language Not Found
          </h1>
          <Link
            href="/learning"
            className="text-[#0004ff] font-['inter-semi'] hover:underline"
          >
            Back to Learning
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <Link
          href="/learning"
          className="inline-flex items-center gap-2 text-[#6b7280] hover:text-[#0004ff] font-['inter-semi'] text-sm mb-8"
        >
          <FaArrowLeft size={14} />
          Back to Learning
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{language.icon}</span>
          <div>
            <h1 className="text-5xl font-['inter'] text-black">
              {language.name}
            </h1>
            <p className="text-[#6b7280] font-['inter-rag'] mt-2">
              {language.description}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-12">
          <span className="px-3 py-1 bg-[#f9fafb] text-sm font-['inter-semi'] text-black rounded-full border border-black/5">
            {language.difficulty}
          </span>
          <span className="px-3 py-1 bg-[#f9fafb] text-sm font-['inter-semi'] text-black rounded-full border border-black/5">
            {language.videos.length} Videos
          </span>
          <span className="px-3 py-1 bg-[#f9fafb] text-sm font-['inter-semi'] text-black rounded-full border border-black/5">
            {language.codeExamples.length} Examples
          </span>
        </div>

        <h2 className="text-3xl font-['inter-bold'] text-black mb-8">
          Course Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {language.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <h2 className="text-3xl font-['inter-bold'] text-black mb-8">
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
      </section>
    </main>
  );
}
