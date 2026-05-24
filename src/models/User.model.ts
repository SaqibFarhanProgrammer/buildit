import mongoose from 'mongoose';

export type UserRole = 'FrontEnd' | 'Backend' | 'Both';
export type ThemeType = 'Dark' | 'Light';
export type CodingLevel = 'Beginner' | 'Intermediate' | 'Expert';

export interface UserProfile {
  programmingLanguage: string;
  role: UserRole;
  experience: number;
  theme: ThemeType;
  codingLevel: CodingLevel;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  image: string;
  profile: UserProfile;
  provider: string;
  createdAt?: Date;
  isVerified: boolean;
  updatedAt?: Date;
  emailVerificationCode: string;
  emailVerificationCodeExpire: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
    },
    emailVerificationCodeExpire: {
      type: Date,
    },

    profile: {
      programmingLanguage: {
        type: String,
      },
      role: {
        type: String,
        enum: ['FrontEnd', 'Backend', 'Both'],
      },

      experience: {
        type: Number,
      },
      theme: {
        type: String,
        enum: ['Dark', 'Light'],
      },
      codingLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
      },
    },
    provider: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
