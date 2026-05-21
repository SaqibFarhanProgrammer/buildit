import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { RegisterUser } from '@/services/auth/auth.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const res = await RegisterUser(body);

    return NextResponse.json(
      { message: 'User Registered Successfully', res },
      { status: 201 }
    );
  } catch (error: unknown) {
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
