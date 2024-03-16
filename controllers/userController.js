import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Otp from "../models/Otp.js";
import bcryptjs from "bcryptjs";

dotenv.config();

const sendOtpMail = async (name, email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });

  const options = {
    from: process.env.USER,
    to: email,
    subject: 'Digishivar - OTP for forgot password',
    html: `<h4>Dear, ${name} <br> Thank you for choosing Digishivar. <br> To ensure the security of your account, please use the following One-Time Password (OTP) for updating password: <br>
    <h2> OTP: ${otp} </h2> <br> Thank you</h4>`
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Emailed successfully");
        resolve(info);
      }
    })
  })
}

const passwordUpdateMail = async (name, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });

  const options = {
    from: process.env.USER,
    to: email,
    subject: 'Digishivar - Password Updated',
    html: `<h4>Dear, ${name} <br> Thank you for choosing Digishivar. <br> Your password for your account has been updated. If it wasn't you, please contact us immediately. <br> Thank you</h4></h4>`
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Emailed successfully");
        resolve(info);
      }
    })
  })
}

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

    if (role === "admin") {
      const isAdmin = await User.findOne({ role: "admin" });
      if (isAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Only one admin is allowed to register. Before you someone has registered'
        })
      }
    }

    //Save User in database
    await User({
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

const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "User not registered!!" });

    const otp = await Otp.create({
      email,
      otp: Math.floor(10000 + Math.random() * 90000),
      expiresIn: new Date().getTime() * 5 * 60 * 1000
    })

    sendOtpMail(user.name, email, otp.otp);
    res.status(200).json({ success: true });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

const updatePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const validOtp = await Otp.findOne({ email, otp });

    if (validOtp) {
      const diff = validOtp.expiresIn - new Date().getTime();
      if (diff < 0)
        return res.status(400).json({ success: false, message: 'OTP Expired' })

      const salt = await bcryptjs.genSalt(10);
      const secPassword = await bcryptjs.hash(password, salt);

      const user = await User.findOneAndUpdate({ email }, { password: secPassword }, { new: true });
      passwordUpdateMail(user.name, email);

      res.status(200).json({ success: true, user });

    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP' })
    }

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export { registerController, loginController, updateController, getUsersController, sendMail, updatePassword };
