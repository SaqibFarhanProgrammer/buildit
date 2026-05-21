import jwt from 'jsonwebtoken';
export function EncodeEmail(email: string) {
  const encodedMail = jwt.sign(email, process.env.JWT_SECRET!);
  return encodedMail;
}

export function DecodeEmail(email: string) {
  const decodedMail = jwt.verify(email, process.env.JWT_SECRET!);
  return decodedMail;
}
