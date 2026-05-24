import { connectDB } from '@/core/db/DbConnection';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@/models/User.model';
import { AppError } from '@/lib/AppError';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    console.log('route reached');

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const decoded = jwt.verify(email, process.env.JWT_SECRET as string) as {
      email: string;
    };

    console.log(decoded);

    const user = await User.findOne({
      email: decoded,
    });

    console.log(user);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      {
        email: decoded.email,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    // workingon setpassor d

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
    console.error('SET_PASSWORD_ERROR:', error);

    let message = 'Internal Server Error';
    let statusCode = 500;

    if (error instanceof jwt.JsonWebTokenError) {
      message = 'Invalid or expired token';
      statusCode = 401;
    } else if (error instanceof AppError) {
      message = error.message;
      statusCode = error.statusCode;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: statusCode,
      }
    );
  }
}
