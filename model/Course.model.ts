import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Course", CourseSchema);
