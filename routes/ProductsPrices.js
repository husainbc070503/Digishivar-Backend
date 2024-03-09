import { Router } from "express";
import ProductsPrices from "../controllers/productPrices.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
const router = Router();

router.get("/prices", ValidateUser, ProductsPrices);

export default router;
