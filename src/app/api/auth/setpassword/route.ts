import { connectDB } from '@/core/db/DbConnection';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@/models/User.model';
import { AppError } from '@/lib/AppError';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const decoded = jwt.verify(email, process.env.JWT_SECRET as string);

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      {
        email: decoded,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Password updated successfully',
      },
      {
        status: 200,
      }
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
