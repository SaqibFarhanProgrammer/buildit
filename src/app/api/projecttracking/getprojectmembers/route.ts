import { AppError } from '@/lib/AppError';
import { GetProjectMembers } from '@/services/projectTracking/project-tracking.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectid } = body;

    const result = await GetProjectMembers(projectid);

    return NextResponse.json({
      message: 'members fethed succes',
      data: result,
    });
  } catch (error) {
    console.error('PROJECT TRACKING ERROR:', error);

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
