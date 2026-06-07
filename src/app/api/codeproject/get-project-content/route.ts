import { AppError } from '@/lib/AppError';
import { GetProjectContent } from '@/services/codeProject/create-project.service';
import { NextRequest, NextResponse } from 'next/server';

type CacheData = {
  content: string;
  source: 'database';
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: 'Project id is required' },
        { status: 400 }
      );
    }

    const project = await GetProjectContent(id);

    return NextResponse.json({
      ...project,
      message: 'Project content fetched successfully',
      source: 'database',
    });
  } catch (error: unknown) {
    console.error('GET_PROJECT_CONTENT_ERROR:', error);

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
