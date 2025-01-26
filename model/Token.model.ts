import mongoose from "mongoose";

const Schema = mongoose.Schema;

export enum TokenType {
  emailVerification = "emailVerification",
  passwordReset = "passwordReset",
}

const tokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(TokenType),
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("token", tokenSchema);
