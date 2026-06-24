import mongoose, { Document, Schema, Model, model } from 'mongoose';

export type TaskState = 'TO DO' | 'IN PROGRESS' | 'HOLD' | 'DONE';

export interface ITaskTracking extends Document {
  title: string;
  summary: string;
  createdUserid: string;
  projectid: string;
  state: TaskState;
  assignToMemberId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskTrackingSchema: Schema<ITaskTracking> = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    createdUserid: { type: String, required: true },
    projectid: { type: String, required: true },
    state: {
      type: String,
      enum: ['TO DO', 'IN PROGRESS', 'HOLD', 'DONE'],
      default: 'TO DO',
    },
    assignToMemberId: { type: String },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TaskTracking: Model<ITaskTracking> =
  mongoose.models.TaskTracking ||
  model<ITaskTracking>('TaskTracking', TaskTrackingSchema);
