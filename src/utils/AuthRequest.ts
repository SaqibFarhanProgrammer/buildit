import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { AppError } from '@/lib/AppError';
import { cookies } from 'next/headers';
import { redirect } from 'next/dist/client/components/navigation';

const cookieStore = await cookies();
const token = cookieStore.get('token')?.value;

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

export async function GetUseridByToken() {
  if (!token) {
    redirect('/auth/login');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  console.log(decoded.userId);

  return decoded.userId;
}
