import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import { AppError } from '@/lib/AppError';
import { projectGetSourceForAsset } from 'next/dist/build/swc/generated-native';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1. Get token from cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    if (!decoded?.userId) {
      throw new AppError('Invalid token', 401);
    }

    // 3. Read body
    const body = await req.json();

    const { programmingLanguage, role, experience, theme, codingLevel } =
      body || {};

    if (!programmingLanguage || !role || !theme || !codingLevel) {
      throw new AppError('Missing profile fields', 400);
    }

    // 4. Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // 5. Update profile
    user.profile = {
      programmingLanguage,
      role,
      experience,
      theme,
      codingLevel,
    };

    await user.save();

    // 6. Response
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error: unknown) {
    console.error('PROFILE_UPDATE_ERROR:', error);

    let message = 'Server Error';
    let statusCode = 500;

    if (error instanceof AppError) {
      message = error.message;
      statusCode = error.statusCode;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, message },
      { status: statusCode }
    );
  }
}
