import { User } from '@/models/User.model';
import { DecodeEmail } from './EncodeEmail';

const cache = new Map();

export async function getUserProfile(token: string) {
  const userId = DecodeEmail(token);

  if (!userId) return null;

  const cacheKey = `user:${userId}`;

  const cached = cache.get(cacheKey);

  if (cached) {
    return {
      source: 'cache',
      data: cached,
    };
  }

  const user = await User.findById(userId)
    .select('name email image createdAt profile')
    .lean();

  if (!user) return null;

  cache.set(cacheKey, user);

  return {
    source: 'db',
    data: user,
  };
}