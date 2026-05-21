import { Document, Schema, Model, model } from 'mongoose';

export interface IProject extends Document {
  workspaceId: string;
  name: string;
  language: string;
  description?: string;
  content?: string;
  createdAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    workspaceId: { type: String, required: true },
    name: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
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
