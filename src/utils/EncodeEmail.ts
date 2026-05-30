import jwt from 'jsonwebtoken';
export function GenerateToken(email: string) {
  console.log(process.env.JWT_SECRET);

  return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

export function VerifyToken(token: string) {
  console.log(process.env.JWT_SECRET);
  return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
}
