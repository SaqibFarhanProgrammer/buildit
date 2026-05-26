import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import { AppError } from '@/lib/AppError';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      throw new AppError('Authorization code missing', 400);
    }

    // 1. Exchange code for access token (GitHub OAuth)

    const tokenRes = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new AppError('Failed to get access token', 401);
    }

    // 2. Get GitHub user

    const githubUserRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser = await githubUserRes.json();

    // 3. Get emails

    const emailRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emails = await emailRes.json();

    const primaryEmail = emails.find(
      (email: any) => email.primary && email.verified
    );

    if (!primaryEmail?.email) {
      throw new AppError('GitHub email not found', 400);
    }

    // 4. Find or create user

    let dbUser = await User.findOne({
      email: primaryEmail.email,
    });

    if (!dbUser) {
      dbUser = await User.create({
        name: githubUser.name || githubUser.login,
        email: primaryEmail.email,
        image: githubUser.avatar_url,
        provider: 'github',
        githubId: githubUser.id,
        password: null,
      });
    }

    // 5. Create JWT

    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    // 6. Redirect response

    const response = NextResponse.redirect(
      new URL('/auth/complete-profile', req.url)
    );

    // 7. Set cookie

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('GITHUB_AUTH_ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Internal Server Error',
      },
      {
        status: error?.statusCode || 500,
      }
    );
  }
}
