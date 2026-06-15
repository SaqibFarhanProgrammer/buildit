import { AppError } from '@/lib/AppError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {

    // return NextResponse.json({
    //   message: result.message,
    //   task: result.task,
    // });
  } catch (error) {
    console.error('CREATE_TASK_ERROR:', error);

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
