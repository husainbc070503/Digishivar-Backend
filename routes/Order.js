import { Router } from "express";
import Order from "../models/Order.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import isCustomer from "../middlewares/isCustomer.js";
import isFarmer from "../middlewares/isFarmer.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const router = Router();

const sendOrderPlacedMail = async (name, email) => {
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
    subject: 'Digishivar - Order Placed',
    html: `<h4>Dear, ${name} <br> Thank you for choosing Digishivar. <br> Your order has been placed. Once farmer check the details of the order, he/she will get back to you soon <br> Thank you</h4>`
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

router.post("/placeOrder", ValidateUser, isCustomer, async (req, res) => {
  try {
    var order = await Order.create({ ...req.body, user: req.user });
    order = await Order.findById(order._id)
      .populate("user", "-password")
      .populate('farmer')
      .populate("products.pro");

    sendOrderPlacedMail(req.user.name, req.user.email)
    res.status(200).json({ success: true, order });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get("/orders", ValidateUser, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .populate('farmer')
      .populate("products.pro");

    res.status(200).json({ success: true, orders });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/changePaymentStatus/:id', ValidateUser, isFarmer, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { paymentStatus: true }, { new: true })
      .populate("user", "-password")
      .populate('farmer')
      .populate("products.pro");

    res.status(200).json({ success: true, order });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

export default router;
