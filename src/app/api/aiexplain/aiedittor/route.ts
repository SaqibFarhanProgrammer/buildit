import { AppError } from '@/lib/AppError';
import { EdittorAI } from '@/lib/gemini/Edittor-Ai';
import { NextRequest, NextResponse } from 'next/server';

type RateLimitData = {
  count: number;
  expiresAt: number;
};

const cache = new Map<string, RateLimitData>();

const MAX_REQUESTS = 3;
const WINDOW_TIME = 20 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: 'Unauthorized user',
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const { userid, coding_experince, coding_level, code } = body;

    if (!userid || !code) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
        },
        {
          status: 400,
        }
      );
    }

    const cacheKey = `limit-${userid}`;

    const currentUser = cache.get(cacheKey);

    if (!currentUser) {
      cache.set(cacheKey, {
        count: 1,
        expiresAt: Date.now() + WINDOW_TIME,
      });
    } else {
      const isExpired = Date.now() > currentUser.expiresAt;

      if (isExpired) {
        cache.set(cacheKey, {
          count: 1,
          expiresAt: Date.now() + WINDOW_TIME,
        });
      } else {
        if (currentUser.count >= MAX_REQUESTS) {
          return NextResponse.json(
            {
              message:
                'AI explain limit exceeded. Please try again after 20 minutes.',
            },
            {
              status: 429,
            }
          );
        }

        currentUser.count += 1;

        cache.set(cacheKey, currentUser);
      }
    }

    const response = await EdittorAI(coding_experince, coding_level, code);

    console.log(cache.get(cacheKey));

    return NextResponse.json(
      {
        message: 'Response fetched successfully',
        response,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error('AI_EXPLAIN_ERROR:', error);

    let message = 'Internal Server Error';
    let statusCode = 500;

    if (error instanceof AppError) {
      message = error.message;
      statusCode = error.statusCode;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        message,
      },
      {
        status: statusCode,
      }
    );
  }
}
