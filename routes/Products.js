import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import isCustomer from "../middlewares/isCustomer.js";
import {
  productController,
  deleteProduct,
  editProduct,
  getProducts,
  giveRating,
  addReview,
  deleteReview,
  readReview,
} from "../controllers/crudProduct.js";

const router = Router();

router.post("/addProduct", ValidateUser, isFarmer, productController);

router.put("/editProduct/:id", ValidateUser, isFarmer, editProduct);

router.delete("/deleteProduct/:id", ValidateUser, isFarmer, deleteProduct);

router.get("/products", ValidateUser, getProducts);

router.put("/rate/:id", ValidateUser, isCustomer, giveRating);

router.put("/addReview/:id", ValidateUser, isCustomer, addReview);

router.get("/readReview/:id", ValidateUser, isCustomer, readReview);

router.put("/deleteReview/:id", ValidateUser, isCustomer, deleteReview);

export default router;
