import mongoose, { Document, Schema, Model, model } from 'mongoose';

export type TaskState = 'TO DO' | 'IN PROGRESS' | 'HOLD' | 'DONE';

export interface ITaskTracking extends Document {
  title: string;
  summary: string;
  createdUserid: mongoose.Types.ObjectId | string;
  projectid: mongoose.Types.ObjectId | string;
  state: TaskState;
  assignToMemberId?: mongoose.Types.ObjectId | string;
  dueDate?: Date;
  createdByUserName: string;
  createdByUserNameAvatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskTrackingSchema: Schema<ITaskTracking> = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    createdUserid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectid: { type: Schema.Types.ObjectId, ref: 'ProjectTracking', required: true },
    state: {
      type: String,
      enum: ['TO DO', 'IN PROGRESS', 'HOLD', 'DONE'],
      default: 'TO DO',
    },
    assignToMemberId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdByUserName: { type: String },
    createdByUserNameAvatar: String,
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TaskTracking: Model<ITaskTracking> =
  mongoose.models.TaskTracking ||
  model<ITaskTracking>('TaskTracking', TaskTrackingSchema);
