import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import jwt from 'jsonwebtoken';

const cache = new Map();

function toPlainUserData(user: Record<string, unknown>) {
  return JSON.parse(JSON.stringify(user)) ;
}

import { CodingLevel, ThemeType, UserRole } from '@/models/User.model';
import { AppError } from '@/lib/AppError';

export type UserProfileT = {
  codingLevel: CodingLevel;
  experience: string; // Kyunki data mein "1" string format mein hai
  programmingLanguage: string;
  role: UserRole;
  theme: ThemeType;
};

// 3. Main User Schema type

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
      data: cached,
    };
  }

  await connectDB();

  const user = await User.findById(userId)
    .select('_id name email image createdAt profile')
    .lean();

  if (!user) throw new AppError('user not found in Getuserprofile', 401);

  const plainUser = toPlainUserData(user as Record<string, unknown>);

  cache.set(cacheKey, plainUser);

  return {
    data: plainUser,
  };
}
