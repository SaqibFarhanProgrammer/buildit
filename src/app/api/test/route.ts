import { NextResponse } from 'next/server';

const cache = new Map();
const cacheKey = 'limit';

export async function GET() {
  let currentLimit = cache.get(cacheKey) || 0;

  console.log(currentLimit);

  if (currentLimit >= 3) {
    return NextResponse.json({
      messgae: 'limit ',
    });
  }

  console.log(cache.get(cacheKey));

  currentLimit++;
  cache.set(cacheKey, currentLimit);

  return NextResponse.json({
    message: 'Hello World',
  });
}
