import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { AppError } from '@/lib/AppError';

export async function IsUserAuthenticate(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      throw new AppError('unauthorize request please login', 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    return decoded.userId;
  } catch (error) {
    return null;
  }
}
