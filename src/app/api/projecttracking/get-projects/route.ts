import { AppError } from '@/lib/AppError';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // const response = await GetProjectTrackingProjects(token);

    // return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('GET_PROJECT_TRACKING_ERROR:', error);

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
        success: false,
        message,
      },
      {
        status: statusCode,
      }
    );
  }
}
