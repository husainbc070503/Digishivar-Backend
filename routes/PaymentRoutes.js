import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import isCustomer from "../middlewares/isCustomer.js";
import paymentController from "../controllers/paymentController.js";

const router = Router();

router.post("/checkout", ValidateUser, isCustomer, paymentController);

export default router;
