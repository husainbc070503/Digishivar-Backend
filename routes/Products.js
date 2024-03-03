import { Router } from "express";
import productController from "../controllers/productController.js";

//router object
const router = express.Router();

//routes

//Add Product - Type: POST
router.post("/addproduct", productController);

export default router;