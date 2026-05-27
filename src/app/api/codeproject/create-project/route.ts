import { AppError } from '@/lib/AppError';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

// Note: we're working on creating project code edittor
export async function POST(request: Request) {
  try {
    const { projectName, projectDescription, language, id } =
      await request.json();

    // Validate required fields
    if (!projectName || typeof projectName !== 'string') {
      return NextResponse.json(
        { message: 'projectName is required and must be a string' },
        { status: 400 }
      );
    }

    if (!projectDescription || typeof projectDescription !== 'string') {
      return NextResponse.json(
        { message: 'projectDescription is required and must be a string' },
        { status: 400 }
      );
    }

    if (!language || typeof language !== 'string') {
      return NextResponse.json(
        { message: 'language is required and must be a string' },
        { status: 400 }
      );
    }

    // Here you would typically save the project to a database
    // For this example, we'll just return a success message

    return NextResponse.json({
      message: 'Project created successfully',
      project: { projectName, projectDescription, language },
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
