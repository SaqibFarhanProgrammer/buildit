import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import jwt from 'jsonwebtoken';

const cache = new Map<string, Record<string, unknown>>();

import { CodingLevel, ThemeType, UserRole } from "@/models/User.model";

export type UserProfileT = {
  codingLevel: CodingLevel;
  experience: string; // Kyunki data mein "1" string format mein hai
  programmingLanguage: string;
  role: UserRole;
  theme: ThemeType;
};

// 3. Main User Schema type
export interface UserDataT {
  email: string;
  image: string;
  name: string;
  profile: UserProfileT;
}


function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    return decoded.userId ?? null;
  } catch {
    return null;
  }
}

export async function getUserProfile(token: string) {
  const userId = getUserIdFromToken(token);

  if (!userId) return null;

  const cacheKey = `user:${userId}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return {
      source: 'cache' as const,
      data: cached,
    };
  }

  await connectDB();

  const user = await User.findById(userId)
    .select('_id name email image createdAt profile')
    .lean();

  if (!user) return null;

  cache.set(cacheKey, user);

  return {
    source: 'db' as const,
    data: JSON.parse(user),
  };
}
