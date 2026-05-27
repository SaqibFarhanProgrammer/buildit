import jwt, { JwtPayload } from 'jsonwebtoken';

type TokenPayload = {
  userId?: string;
  email?: string;
  role?: string;
};

export function GenerateToken(payload: TokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!);
}

export function VerifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload &
      TokenPayload;

    return decoded;
  } catch {
    return null;
  }
}
