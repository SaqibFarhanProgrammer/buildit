import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { SaveProjectContent } from '@/services/codeProject/create-project.service';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { code, projectId, userid } = body as {
      code: string;
      projectId: string;
      userid: string;
    };
    await SaveProjectContent(code, projectId, userid);
    return NextResponse.json(
      { message: 'Code saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('SAVE_CODE_ERROR:', error);

    let message = 'Server Error';
    let statusCode = 500;
    if (error instanceof AppError) {
      message = error.message;
      statusCode = error.statusCode;
    }

    return NextResponse.json({ message }, { status: statusCode });
  }
}
