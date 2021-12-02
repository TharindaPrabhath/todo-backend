import mongoose, { Schema } from "mongoose";

export interface TodoDocument extends mongoose.Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isUpdated: boolean;
  user: string;
}

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model<TodoDocument>("Todo", TodoSchema);

export default Todo;
