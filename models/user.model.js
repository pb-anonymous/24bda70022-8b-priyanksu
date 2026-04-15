import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to verify password
userSchema.methods.verifyPassword = async function (password) {
  return argon2.verify(this.password, password);
};

export default mongoose.model("User", userSchema);
