import { NextResponse } from 'next/server';

const cache = new Map();
const cacheKey = 'limit';

export async function GET() {
  let currentLimit = cache.get(cacheKey) || 0;

  if (currentLimit >= 3) {
    return NextResponse.json({
      messgae: 'limit ',
    });
  }


  currentLimit++;
  cache.set(cacheKey, currentLimit);

  return NextResponse.json({
    message: 'Hello World',
  });
}
