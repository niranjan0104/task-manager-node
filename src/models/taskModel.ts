import mongoose, { Schema } from "mongoose";

const taskSchema: Schema = new Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: {type: String, required: true},
  status: {type: String, enum: ["Pending", "In-Progress", "Completed"], default: "Pending"},
  priority: {type: String, enum: ["Low", "Medium", "High"]},
  dueDate: {type: Date},
  isDeleted: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", taskSchema);
