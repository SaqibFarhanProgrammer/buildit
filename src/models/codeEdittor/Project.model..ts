import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  language: string;
  description?: string;
  content?: string;
  CreatedUserid?: string;
  createdAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    CreatedUserid: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

export const Project: Model<IProject> = model<IProject>(
  'Project',
  ProjectSchema
);
