import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  pdf: {
    type: String,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  date: {
    type: Date,
  },
});
export default mongoose.model("Lesson", LessonSchema);
