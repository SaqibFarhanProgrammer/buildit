// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User.model';
import { AppError } from '@/lib/AppError';
import { connectDB } from '@/core/db/DbConnection';

export async function GET(req: NextRequest) {
  await connectDB();
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      null,
      {
        params: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // 2. Get user info
    const userRes = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userRes.data;
    console.log(user);

    // aik rotned per passwor dka eorute abnanahaishi phri us password wlae rou tmein passswor dlenahai kio ekgooels e authhai htphriuskodmeinsektawraka rphri uskojao whai whi cookei meinsteraknahaok

    const newuser = await User.create({
      name: userRes.data.name,
      email: userRes.data.email,
      image: userRes.data.picture,
      password: '',
      provider: 'google',
    });
    console.log(newuser);

    // 3. Create your JWT
    const token = jwt.sign(
      {
        useriD: newuser._id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // 4. Set cookie
    const response = NextResponse.redirect(new URL('/profile', req.url));
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}
