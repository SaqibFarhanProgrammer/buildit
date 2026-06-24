import jwt from 'jsonwebtoken';
export function GenerateToken(email: string) {

  return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

export function VerifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
}
