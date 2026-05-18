export interface Challenge {
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
