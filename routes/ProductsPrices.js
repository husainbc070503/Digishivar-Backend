import { Router } from "express";
import ProductsPrices from "../models/ProductsPrices.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
const router = Router();

router.get("/prices", ValidateUser, isFarmer, async (req, res) => {
  try {
    console.log(req.user);
    const prices = await ProductsPrices.find();
    res.status(200).json({ success: true, prices });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
