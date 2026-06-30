import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  language: string;
  description?: string;
  content?: string;
  state: 'active' | 'Finished';
  CreatedUserid?: mongoose.Types.ObjectId | string;
  createdAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    CreatedUserid: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    state: { type: String, enum: ['active', 'Finished'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

export const Project: Model<IProject> =
  mongoose.models.Project || model<IProject>('Project', ProjectSchema);
