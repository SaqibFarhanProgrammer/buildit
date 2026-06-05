import { AppError } from '@/lib/AppError';
import { CreateProject } from '@/services/codeProject/create-project.service';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { NextRequest } from 'next/server';

// Note: we're working on creating project code edittor
export async function POST(request: NextRequest) {
  try {
    const result = await CreateProject(request);

    return NextResponse.json({
      message: 'Project created successfully',
      project: result.project,
    });
  } catch (error) {
    console.error('REGISTER_USER_ERROR:', error);

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
