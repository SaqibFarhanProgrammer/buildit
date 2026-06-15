import { AppError } from '@/lib/AppError';
import { ProjectTracking } from '@/models/project traccking/project-tracking.models';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const projectId = searchParams.get('projectId');

    if (!taskId || !projectId) {
      return NextResponse.json(
        { message: 'Task id and project id are required' },
        { status: 400 }
      );
    }

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // return NextResponse.json({ message: result.message });
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
