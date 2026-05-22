import jwt from 'jsonwebtoken';
export function EncodeEmail(email: string) {
  const encodedMail = jwt.sign(email, process.env.JWT_SECRET!);
  return encodedMail;
}

export function DecodeEmail(email: string) {
  try {
    const decode = jwt.verify(email, process.env.JWT_SECRET!);

    if (typeof decode === 'string') {
      return decode;
    }

    return null;
  } catch (err) {
    return null;
  }
}
