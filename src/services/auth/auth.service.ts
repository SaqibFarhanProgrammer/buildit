import { User } from '@/models/User.model';
import { GenerateVerificationCOde } from '@/utils/GenerateVerificationCode..utils';
import { SendEmail } from './EmailVerification.service';
import { AppError } from '@/lib/AppError';
import bcrypt from 'bcryptjs';
import { GenerateToken } from '@/utils/EncodeEmail';

type LoginBody = {
  email: string;
  password: string;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const COOKIE_EXPIRY_DAYS = 7;
const COOKIE_MAX_AGE = COOKIE_EXPIRY_DAYS * 24 * 60 * 60;

async function LoginUser(body: LoginBody) {
  const { email, password } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error('Invalid email address');
  }

  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = bcrypt.compare(password, user.password);
  if (!hashedPassword) {
    throw new Error('Email or password is incorrect');
  }


  const userId = user._id.toString();
  return {
    _id: userId,
    email: user.email,
    name: user.name,
    message: 'Login successful',
  };
}

async function RegisterUser(body: UserType) {
  const { name, email, password, confirmPassword } = body;

  if (!name || name.trim().length === 0) {
    throw new AppError('Name is required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new AppError('Invalid email address', 400);
  }

  if (!password || password.length < 8) {
    throw new AppError('Password must be at least 8 characters long', 400);
  }

  if (password !== confirmPassword) {
    throw new AppError('Passwords do not match', 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser?.isVerified) {
    throw new AppError('User already exists', 409);
  }

  if (existingUser && !existingUser.isVerified) {
    const newCode = GenerateVerificationCOde();
    const EncodedEmail = GenerateToken(email);

    await User.updateOne(
      { email },
      {
        $set: {
          emailVerificationCode: newCode,
          emailVerificationCodeExpire: new Date(Date.now() + 10 * 60 * 1000),
        },
      }
    );

    await SendEmail(email, newCode);

    return {
      message: 'Verification code resent',
      encodedEmail: EncodedEmail,
      status: 200,
    };
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const verificationCode = GenerateVerificationCOde();

  const EMAIL_VERIFICATION_EXPIRY_MINUTES = 10;
  const emailVerificationCodeExpire = new Date(
    Date.now() + EMAIL_VERIFICATION_EXPIRY_MINUTES * 60 * 1000
  );

  await User.create({
    name,
    email,
    image: '',
    password: hashedPassword,
    emailVerificationCode: verificationCode,
    emailVerificationCodeExpire: emailVerificationCodeExpire,
    provider: 'signup',
  });

  await SendEmail(email, verificationCode);

  const EncodedEmail = GenerateToken(email);

  return {
    message: 'Check your email for verification code',
    encodedEmail: EncodedEmail,
    status: 200,
  };
}

export { LoginUser, RegisterUser };
