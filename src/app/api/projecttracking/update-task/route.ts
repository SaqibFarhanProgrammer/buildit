import { AppError } from '@/lib/AppError';
import { UpdateProjectTrackingTask } from '@/services/projectTracking/project-tracking.service';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const result = await UpdateProjectTrackingTask(request);

    return NextResponse.json({
      message: result.message,
      task: result.task,
    });
  } catch (error) {
    console.error('UPDATE_TASK_ERROR:', error);

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
