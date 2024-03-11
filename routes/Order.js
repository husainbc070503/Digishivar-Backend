import { Router } from "express";
import Order from "../models/Order.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import isCustomer from "../middlewares/isCustomer.js";
const router = Router();

router.post("/placeOrder", ValidateUser, isCustomer, async (req, res) => {
  try {
    var order = await Order.create({ ...req.body, user: req.user });
    order = await Order.findById(order._id)
      .populate("user", "-password")
      .populate("products.pro");

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get("/orders", ValidateUser, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .populate("products.pro");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
