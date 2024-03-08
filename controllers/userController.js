// const JWT = require("jsonwebtoken");

import User from "../models/userModel.js";

// const { hashPassword, comparePassword } = require("../helpers/authHelper");

//Register
const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password, role } = req.body;

    //Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!phone || phone.length !== 10) {
      return res.status(400).send({
        success: false,
        message: "Phone Number is required",
      });
    }
    if (!address) {
      return res.status(400).send({
        success: false,
        message: "Address is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and 6 Character long",
      });
    }

    //Existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already registered with this email",
      });
    }

    //Save User in database
    const user = await User({
      name,
      email,
      phone,
      address,
      password,
      role,
    }).save();

    //Success
    res.status(201).send({
      success: true,
      message: "Registration successfull please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// login
const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    var user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not registered" });

    if (role != user.role) {
      return res
        .status(400)
        .json({ success: false, message: "Role not specified" });
    }
    if (!(await user.validatePassword(password)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    console.log(await user.generateToken());
    return res.status(200).json({
      success: true,
      user: { user, token: await user.generateToken() },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateController = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

const getUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export { registerController, loginController, updateController, getUsersController };
