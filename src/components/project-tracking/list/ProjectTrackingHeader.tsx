'use client';

export default function ProjectTrackingHeader() {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/40 uppercase  ">
          Project Tracking
        </span>
      </div>
      <h1 className="font-['inter-bold'] text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#0a0a0a] mb-3">
        Your <span className="text-[#0004FF]">Projects</span>
      </h1>
      <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/50 leading-relaxed max-w-xl">
        Manage project tasks, track progress across teams, and stay organized
        with your development workflow.
      </p>
    </div>
  );
}
