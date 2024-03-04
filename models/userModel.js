import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Please add phone number"],
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      min: 8,
      max: 64,
    },
    role: {
      type: String,
      enum: ['customer', 'farmer', 'admin'],
      default: "customer",
    },
  },

  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    var user = this;
    if (!user.isModified('password'))
      return next();

    const salt = await bcryptjs.genSalt(10);
    const secPassword = await bcryptjs.hash(user.password, salt);
    user.password = secPassword;

  } catch (error) {
    next(error);
  }
});

UserSchema.methods.validatePassword = async function (password) {
  try {
    const res = await bcryptjs.compare(password, this.password);
    return res;
  } catch (error) {
    console.log(error.message);
  }
}

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d"
      }
    )
  } catch (error) {
    console.log(error);
  }
}

const User = mongoose.model("user", UserSchema);
export default User;