import { connectDB } from '@/core/db/DbConnection';
import { IsUserAuthenticate } from '@/utils/AuthRequest';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User.model';
import { cookies } from 'next/headers';

const cache = new Map();

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // 1. Auth checkconst
    const cookieStore = await cookies()
    const token = cookieStore.get("token")
    console.log(token);
    
    const id = await IsUserAuthenticate(request);

    const cacheKey = `user:${id}`;

    // 2. Check cache
    if (cache.has(cacheKey)) {
      console.log('cache se aya hai data');

      return NextResponse.json({
        source: 'cache',
        data: cache.get(cacheKey),
      });
    }

    // 3. DB fetch
    console.log('db se aya hai ');
    const user = await User.findById(id)
      .select('name email image createdAt profile')
      .lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 4. Store in cache
    cache.set(cacheKey, user);

    // 5. Response
    return NextResponse.json({
      source: 'db',
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
