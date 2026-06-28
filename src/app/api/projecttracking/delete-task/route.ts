import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { DeleteProjectTrackingTask } from '@/services/projectTracking/project-tracking.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const result = await DeleteProjectTrackingTask(request);

    return NextResponse.json({
      message: result.message,
    });
  } catch (error) {
    console.error('DELETE_TASK_ERROR:', error);

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
