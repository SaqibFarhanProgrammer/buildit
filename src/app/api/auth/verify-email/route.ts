import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectDB } from '@/core/db/DbConnection';
import { VerifyEmailCode } from '@/services/auth/verifyEmailCode.service';
import { AppError } from '@/lib/AppError';
import { cookies } from 'next/headers';
import { VerifyToken } from '@/utils/EncodeEmail';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email: encodedEmail, code } = body;

    if (!encodedEmail) {
      return NextResponse.json(
        { error: 'Email token is required' },
        { status: 400 }
      );
    }
    const decoded = VerifyToken(encodedEmail);

    const email = decoded.email;

    if (!email) {
      throw new AppError('Token payload invalid', 400);
    }

    const res = await VerifyEmailCode(email, code);

    const cookieStore = await cookies();

    const token = jwt.sign(
      {
        userId: res.id,
        isVerified: res.isVerified,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      message: 'verified success',
      status: 200,
    });
  } catch (error) {
    console.error('VERIFY_EMAIL_ERROR:', error);

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
