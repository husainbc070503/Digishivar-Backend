import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import isCustomer from "../middlewares/isCustomer.js";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = Router();

router.post("/checkout", ValidateUser, isCustomer, checkout);

router.post("/paymentverification", paymentVerification);

export default router;
