import mongoose from "mongoose";

export interface TodoDocument extends mongoose.Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isUpdated: boolean;
}

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model<TodoDocument>("User", TodoSchema);

export default Todo;
