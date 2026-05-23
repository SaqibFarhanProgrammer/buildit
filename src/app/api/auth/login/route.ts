import { LoginUser } from '@/services/auth/auth.service';
import { NextRequest, NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';
export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await LoginUser(body);

  const token = jwt.sign({ userId: res._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  // loginper kaamakrrah tah cookeis sotre per

  cookieStore.set('Token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return NextResponse.json({
    message: 'login user succes',
    status: 200,
  });

  return;
}
