import { Router } from "express";
import productController from "../controllers/productController.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import {
  deleteProduct,
  editProduct,
  getProduct,
} from "../controllers/rudProduct.js";

//router object
const router = Router();

//Add Product - Type: POST
router.post("/addproduct", ValidateUser, isFarmer, productController);

//Edit Product - Type: PUT
router.put("/editProduct/:id", ValidateUser, isFarmer, editProduct);

//Delete Product - Type: DELETE
router.delete("/deleteProduct/:id", ValidateUser, isFarmer, deleteProduct);

//GET Product - Type: GET
router.get("/products", ValidateUser, isFarmer, getProduct);

export default router;
