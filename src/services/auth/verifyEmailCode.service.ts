import { AppError } from '@/lib/AppError';
import { User } from '@/models/User.model';

export async function VerifyEmailCode(email: string, code: string) {
  const user = await User.findOne({ email });
  console.log('check 1 ');

  const TEN_MINUTES = 10 * 60 * 1000;

  const isExpired =
    Date.now() - new Date(user.emailVerificationCodeExpire).getTime() >
    TEN_MINUTES;

  if (isExpired) {
    throw new AppError('Your Email Verification Code is Expired', 400);
  }

  if (user.emailVerificationCode !== code) {
    return {
      message: 'Invalid code',
      status: 400,
    };
  }

  console.log('check 2     ');

  user.isVerified = true;
  user.emailVerificationCode = null;
  user.emailVerificationCodeExpire = null;

  await user.save();

  return {
    message: 'Verified successfully',
    status: 200,
  };
}
