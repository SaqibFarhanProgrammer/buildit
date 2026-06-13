import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { AppError } from '@/lib/AppError';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function IsUserAuthenticate(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GetUseridByToken() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  return decoded.userId;
}
