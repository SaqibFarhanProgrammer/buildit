import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IProjectTracking extends Document {
  title: string;
  description: string;
  state: 'active' | 'archive';
  createdByUserId: string;
  createdByUserName: string;
  members: string[];
  tasks: string[];
  isAdmin: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ProjectTrackingSchema: Schema<IProjectTracking> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    state: {
      type: String,
      enum: ['active', 'archive'],
      default: 'active',
    },
    createdByUserId: { type: String, required: true },
    members: [{ type: String }],
    tasks: [{ type: String }],
    createdByUserName: [{ type: String }],
    isAdmin: { type: Boolean, default: true },
  },

  { timestamps: true }
);

export const ProjectTracking: Model<IProjectTracking> =
  mongoose.models.ProjectTracking ||
  model<IProjectTracking>('ProjectTracking', ProjectTrackingSchema);
