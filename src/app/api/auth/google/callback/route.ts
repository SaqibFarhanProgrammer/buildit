// app/api/auth/google/callback/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User.model';
import { connectDB } from '@/core/db/DbConnection';
import { cookies } from 'next/headers';
import { EncodeEmail } from '@/utils/EncodeEmail';
import { AppError } from '@/lib/AppError';

export async function GET(req: NextRequest) {
  await connectDB();
  const cookieStore = await cookies();

  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    // 1. Exchange code for token
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // 2. Get Google user
    const userRes = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const googleUser = userRes.data;

    // 3. Find or create user (IMPORTANT FIX)
    let dbUser = await User.findOne({ email: googleUser.email });

    if (!dbUser) {
      dbUser = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        password: 'initial',
        image: googleUser.picture,
        provider: 'google',
      });
    }

    // 4. Create JWT
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // 5. Set cookie + redirect
    const encodedEmail = EncodeEmail(dbUser.email);

    const response = NextResponse.redirect(
      new URL(`/auth/setpassword?e=${encodedEmail}`, req.url)
    );
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
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
