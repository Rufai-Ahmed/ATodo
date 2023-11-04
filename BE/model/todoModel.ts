import mongoose from "mongoose";

export interface iTodo {
  task: string;
  timeAchieved: boolean;
  deadline: string | null;
  done: string;
}

export interface iTodo extends mongoose.Document {}

const todoModel = new mongoose.Schema<iTodo>(
  {
    task: {
      type: String,
    },
    timeAchieved: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: String,
    },
    done: {
      type: String,
      default: "start",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<iTodo>("TODOS", todoModel);
