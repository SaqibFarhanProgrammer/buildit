import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import { EncodeEmail } from '@/utils/EncodeEmail';
import { AppError } from '@/lib/AppError';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      throw new AppError('Authorization code missing', 400);
    }

    // 1. Exchange code for access token

    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    if (!accessToken) {
      throw new AppError('Failed to get access token', 401);
    }

    // 2. Fetch GitHub user

    const githubUserRes = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser = githubUserRes.data;

    // 3. Fetch email separately
    // GitHub often keeps email private

    const emailRes = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const primaryEmail = emailRes.data.find(
      (email: { primary: boolean; verified: boolean; email: string }) =>
        email.primary && email.verified
    );

    if (!primaryEmail?.email) {
      throw new AppError('GitHub email not found', 400);
    }

    // 4. Find existing user

    let dbUser = await User.findOne({
      email: primaryEmail.email,
    });

    // 5. Create user if not exists

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

    // 6. Create app JWT

    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    // 7. Redirect logic

    const response = NextResponse.redirect(
      new URL(`/auth/complete-profile`, req.url)
    );

    // 8. Set cookie

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    console.error('GITHUB_AUTH_ERROR:', error);

    let message = 'Internal Server Error';
    let statusCode = 500;

    if (error instanceof AppError) {
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
