import ChallengeCard from './ChallengeCard';

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

export default function ChallengeGrid({
  challenges,
}: {
  challenges: Challenge[];
}) {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/30">
          No challenges found for this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
