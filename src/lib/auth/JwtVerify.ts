import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function verifyJwtFromRequest(req: NextRequest) {
  const token = req.cookies.get('Token')?.value;

  if (!token) {
    return {
      valid: false,
      error: 'JWT token not found in cookies',
    };
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return {
      valid: true,
      payload,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JWT token',
    };
  }
}
