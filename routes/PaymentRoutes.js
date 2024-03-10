import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import isCustomer from "../middlewares/isCustomer.js";
import paymentController from "../controllers/paymentController.js";

const router = Router();

router.route("/checkout", ValidateUser, isFarmer, paymentController);

export default router;
