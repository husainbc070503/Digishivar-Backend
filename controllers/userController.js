// const JWT = require("jsonwebtoken");

import User from "../models/userModel.js";

// const { hashPassword, comparePassword } = require("../helpers/authHelper");

//Register
const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

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
    const user = await userModel({
      name,
      email,
      phone,
      address,
      password,
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

}

export { registerController, loginController };
