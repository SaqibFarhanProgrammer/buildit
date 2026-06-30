import mongoose, { Document, Schema, Model, model } from 'mongoose';

export type MemberType = {
  userid: mongoose.Types.ObjectId | string;
  MemberRole: string;
};

export interface IProjectTracking extends Document {
  title: string;
  description: string;
  state: 'active' | 'archive';
  createdByUserId: mongoose.Types.ObjectId | string;
  members: MemberType[];
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
    createdByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
      {
        userid: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        MemberRole: {
          type: String,
          required: true,
        },
      },
    ],
    isAdmin: { type: Boolean, default: true },
  },

  { timestamps: true }
);

ProjectTrackingSchema.index({
  createdByUserId: 1,
});

ProjectTrackingSchema.index({
  'members.userid': 1,
});

export const ProjectTracking: Model<IProjectTracking> =
  mongoose.models.ProjectTracking ||
  model<IProjectTracking>('ProjectTracking', ProjectTrackingSchema);
