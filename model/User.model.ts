import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  password: {
    type: String,
    required: true, // Ensure password is always provided
  },
});

// Remove the password field when converting a document to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Hash the password before saving the document
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

// Static method to find a user by email
UserSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

// Instance method to compare a given password with the hashed password
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password || "");
};

export default mongoose.model("User", UserSchema);
