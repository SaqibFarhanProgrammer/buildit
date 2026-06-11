import { AppError } from '@/lib/AppError';
import { mistralai } from '@/lib/gemini/Ai-Assistent';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized user' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { querry, userinfo } = body;

    if (!querry?.trim()) {
      return NextResponse.json(
        { message: 'Query is required' },
        { status: 400 }
      );
    }

    if (!userinfo?.CodingLevel || !userinfo?.ROle) {
      return NextResponse.json(
        { message: 'Complete userinfo is required' },
        { status: 400 }
      );
    }

    const aiResponse = await mistralai(querry.trim(), userinfo);

    return NextResponse.json(
      {
        message: 'Response fetched successfully',
        data: aiResponse,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('AI_CHAT_ERROR:', error);

    let message = 'Internal Server Error';
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
