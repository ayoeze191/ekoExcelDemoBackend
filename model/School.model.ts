import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  uniqueNumber: String,
});

export default mongoose.model("School", SchoolSchema);
