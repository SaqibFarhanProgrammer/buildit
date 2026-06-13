import ChallengesHeader from '@/components/problems/ChallengesHeader';
import ChallengeFilters from '@/components/problems/ChallengeFilters';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ChallengesHeader />
      <ChallengeFilters />
    </div>
  );
}
