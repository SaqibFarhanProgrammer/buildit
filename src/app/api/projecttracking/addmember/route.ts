import { AddMember } from '@/services/projectTracking/project-tracking.service';
import { AppError } from '@/lib/AppError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const result = await AddMember(request);

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    console.error('Add Member Route Error:', error);

    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}
