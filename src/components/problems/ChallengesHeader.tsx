export default function ChallengesHeader() {
  return (
    <div className="relative bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="w-6 h-[1px] bg-white/20" />
          <span className="font-['inter4-medium'] text-[10px] text-white/40 uppercase tracking-[0.2em]">
            Practice
          </span>
        </div>

        {/* Title */}
        <h1 className="font-['inter-bold'] text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
          Coding <span className="text-[#0004ff]">Challenges</span>
        </h1>
        <p className="font-['inter-rag'] text-sm text-white/50 leading-relaxed max-w-xl">
          Sharpen your skills with competitive programming problems. Track
          progress and climb the leaderboard.
        </p>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-2xl" />
    </div>
  );
}
