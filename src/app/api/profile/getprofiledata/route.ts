import { connectDB } from '@/core/db/DbConnection';
import { IsUserAuthenticate } from '@/utils/AuthRequest';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User.model';

const cache = new Map<string, Record<string, unknown>>();

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const id = await IsUserAuthenticate(request);

    if (!id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cacheKey = `user:${id}`;

    if (cache.has(cacheKey)) {
      return NextResponse.json({
        source: 'cache',
        data: cache.get(cacheKey),
      });
    }

    const user = await User.findById(id)
      .select('name email image createdAt profile')
      .lean();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    cache.set(cacheKey, user);

    return NextResponse.json({
      source: 'db',
      data: user,
    });
  } catch {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
