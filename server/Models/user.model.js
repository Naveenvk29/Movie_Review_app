import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash the password before saving it to the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare the hashed password with the input password

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//
// userSchema.methods.generateJsonWebToken = function () {
//   return jwt.sign(
//     {
//       id: this._id,
//     },
//     process.env.JWT_SECRET_KEY,
//     {
//       expiresIn: process.env.JWT_EXPIRES,
//     }
//   );
// };

export const User = mongoose.model("User", userSchema);
