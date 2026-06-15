import mongoose, { Document, Schema, Model, model } from 'mongoose';

export type TaskState =
  | 'not started'
  | 'in progress'
  | 'hold'
  | 'completed';

export interface ITaskTracking extends Document {
  title: string;
  summary: string;
  createdUserid: string;
  projectid: string;
  state: TaskState;
  assignToMemberId?: string;
  dueDate?: Date;
  taskId: string;
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
      enum: ['not started', 'in progress', 'hold', 'completed'],
      default: 'not started',
    },
    assignToMemberId: { type: String },
    dueDate: { type: Date },
    taskId: { type: String, required: true },
  },
  { timestamps: true }
);

export const TaskTracking: Model<ITaskTracking> =
  mongoose.models.TaskTracking ||
  model<ITaskTracking>('TaskTracking', TaskTrackingSchema);
