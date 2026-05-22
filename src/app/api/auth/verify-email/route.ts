import { NextResponse } from 'next/server';
import { DecodeEmail } from '@/utils/EncodeEmail'; // Adjust this import path to match your utility folder
import { User } from '@/models/User.model';
import { connectDB } from '@/core/db/DbConnection';
import { VerifyEmailCode } from '@/services/auth/verifyEmailCode.service';
import { AppError } from '@/lib/AppError';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email: encodedEmail, code } = body;

    if (!encodedEmail) {
      return NextResponse.json(
        { error: 'Email token is required in the request body' },
        { status: 400 }
      );
    }

    const email = DecodeEmail(encodedEmail);
    console.log(email);

    await VerifyEmailCode(email as string, code);

    return NextResponse.json({
      success: true,
      message: 'verified success',
      status: 200,
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
