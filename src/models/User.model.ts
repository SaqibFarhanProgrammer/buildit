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
  profile: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
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
    profile: {
      programmingLanguage: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['FrontEnd', 'Backend', 'Both'],
        required: true,
      },

      experience: {
        type: Number,
        required: true,
      },
      theme: {
        type: String,
        enum: ['Dark', 'Light'],
        required: true,
      },
      codingLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
        required: true,
      },
    },
  },
  { timestamps: true }
);


export const User =  mongoose.models.User || mongoose.model("User" , UserSchema)