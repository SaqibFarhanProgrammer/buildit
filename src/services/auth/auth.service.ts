import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User.model';
import { IUser } from '@/types';

type LoginBody = {
  email: string;
  password: string;
};

// 7 days in milliseconds
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

  // Find user in database by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify password (in production, compare hashed password)
  if (password !== user.password) {
    throw new Error('Email or password is incorrect');
  }

  // Set authentication cookies for 7 days
  const cookieStore = await cookies();
  const userId = user._id.toString();
  const token = jwt.sign(
    { userId: userId, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  cookieStore.set('Token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return {
    _id: userId,
    email: user.email,
    name: user.name,
    message: 'Login successful',
    token: token,
    expiresAt: new Date(Date.now() + COOKIE_MAX_AGE * 1000).toISOString(),
  };
}

async function LogoutUser() {
  const cookieStore = await cookies();

  // Clear all authentication cookies
  cookieStore.delete('Token');

  return {
    message: 'Logout successful',
  };
}

async function RegisterUser(body: IUser) {
  const { name, email, password, profile } = body;

  // Validate name
  if (!name || name.trim().length === 0) {
    throw new Error('Name is required');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error('Invalid email address');
  }

  // Validate password
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  // Validate profile data
  if (!profile) {
    throw new Error('Profile information is required');
  }

  if (
    !profile.programmingLanguage ||
    profile.programmingLanguage.trim().length === 0
  ) {
    throw new Error('Programming language is required');
  }

  if (
    !profile.role ||
    !['FrontEnd', 'Backend', 'Both'].includes(profile.role)
  ) {
    throw new Error('Role must be one of: FrontEnd, Backend, Both');
  }

  if (
    profile.experience === undefined ||
    profile.experience === null ||
    profile.experience < 0
  ) {
    throw new Error('Experience must be a non-negative number');
  }

  if (!profile.theme || !['Dark', 'Light'].includes(profile.theme)) {
    throw new Error('Theme must be one of: Dark, Light');
  }

  if (
    !profile.codingLevel ||
    !['Beginner', 'Intermediate', 'Expert'].includes(profile.codingLevel)
  ) {
    throw new Error(
      'Coding level must be one of: Beginner, Intermediate, Expert'
    );
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Create new user
  const newUser = new User({
    name,
    email,
    password, // In production, hash the password before saving
    profile,
  });

  // Save to database
  const savedUser = await newUser.save();

  return {
    _id: savedUser._id.toString(),
    name: savedUser.name,
    email: savedUser.email,
    profile: savedUser.profile,
    message: 'Registration successful',
    createdAt: savedUser.createdAt,
  };
}

export { LoginUser, LogoutUser, RegisterUser };
