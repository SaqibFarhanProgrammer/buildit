import { AppError } from '@/lib/AppError';
import { EdittorAI } from '@/lib/gemini/Edittor-Ai';
import { NextRequest, NextResponse } from 'next/server';

type RateLimitData = {
  count: number;
  expiresAt: number;
};

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

    const response = await EdittorAI(coding_experince, coding_level, code);

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
    console.log(error);

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
