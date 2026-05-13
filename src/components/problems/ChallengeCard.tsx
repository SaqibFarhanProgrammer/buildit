interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  description: string;
  completedCount: number;
  totalAttempts: number;
  successRate: number;
  status: string;
  points: number;
}

const difficultyStyles: Record<string, string> = {
  Easy: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
  Medium: 'text-amber-400 border-amber-400/20 bg-amber-400/10',
  Hard: 'text-red-400 border-red-400/20 bg-red-400/10',
};

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const isCompleted = challenge.status === 'completed';

  return (
    <div
      className={`group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#0A0A0A] transition-all duration-300 hover:border-[#0004ff]/30 hover:shadow-lg hover:shadow-[#0004ff]/5 ${
        isCompleted ? '' : ''
      }`}
    >
      {/* Top Row: Difficulty + Category + Points */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {/* Difficulty Badge */}
          <span
            className={`font-['inter-semi'] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border ${difficultyStyles[challenge.difficulty]}`}
          >
            {challenge.difficulty}
          </span>

          {/* Category */}
          <span className="font-['inter-light'] text-[10px] text-white/30 uppercase tracking-wider">
            {challenge.category}
          </span>
        </div>

        {/* Points */}
        <span className="font-['inter-bold'] text-xs text-[#0004ff]">
          {challenge.points} pts
        </span>
      </div>

      {/* Title */}
      <h3 className="font-['inter-bold'] text-base sm:text-lg text-white tracking-tight mb-2 group-hover:text-[#0004ff] transition-colors">
        {challenge.id}. {challenge.title}
      </h3>

      {/* Description */}
      <p className="font-['inter-rag'] text-xs sm:text-sm text-white/40 leading-relaxed mb-6 line-clamp-2 flex-1">
        {challenge.description}
      </p>

      {/* Stats Row */}
      <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-5">
          <div>
            <span className="font-['inter-light'] text-[10px] text-white/20 block mb-0.5">
              Solved
            </span>
            <span className="font-['inter-semi'] text-xs text-white/70">
              {challenge.completedCount.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="font-['inter-light'] text-[10px] text-white/20 block mb-0.5">
              Success
            </span>
            <span className="font-['inter-semi'] text-xs text-white/70">
              {challenge.successRate}%
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`font-['inter-semi'] text-xs px-5 py-2.5 rounded-xl transition-all ${
            isCompleted
              ? 'bg-[#16F020] text-[#fff] border border-white/10 hover:bg-white/10'
              : 'bg-[#0004ff] text-white hover:bg-[#0004ff]/90'
          }`}
        >
          {isCompleted ? 'Completed' : 'Solve'}
        </button>
      </div>

      {/* Completed Indicator (subtle corner) */}
      {isCompleted && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400" />
      )}
    </div>
  );
}
