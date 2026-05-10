import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
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
