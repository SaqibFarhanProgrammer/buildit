import { AppError } from '@/lib/AppError';
import { GetProjectContent } from '@/services/codeProject/create-project.service';
import { NextRequest, NextResponse } from 'next/server';
import id from 'zod/v4/locales/id.js';

type CacheData = {
  content: string;
  source: 'database';
};

const cache = new Map<string, CacheData>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: 'Project id is required' },
        { status: 400 }
      );
    }

    const cacheKey = `project-content-${id}`;

    if (cache.has(cacheKey)) {
      console.log('Cache hit');

      const cachedData = cache.get(cacheKey);

      
      return NextResponse.json({
        content: cachedData?.content,
        message: 'Project content fetched successfully',
        source: 'cache',
      });
    }

    console.log('Fetching from database');

    const content = await GetProjectContent(id);

    if (content) {
      cache.set(cacheKey, {
        content,
        source: 'database',
      });
    }

    return NextResponse.json({
      content,
      message: 'Project content fetched successfully',
      source: 'database',
    });
  } catch (error: unknown) {
    console.error('GET_PROJECT_CONTENT_ERROR:', error);

    let message = 'Server Error';
    let statusCode = 500;

    if (error instanceof AppError) {
      message = error.message;
      statusCode = error.statusCode;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: statusCode });
  }
}
