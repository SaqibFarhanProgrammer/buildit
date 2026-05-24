import { LoginUser } from '@/services/auth/auth.service';
import { NextRequest, NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectDB } from '@/core/db/DbConnection';
export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const cookieStore = await cookies();

  const res = await LoginUser(body);

  const token = jwt.sign({ userId: res._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  // loginper kaamakrrah tah cookeis sotre per
  console.log(res._id);

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    message: 'login user succes',
    status: 200,
  });
}
