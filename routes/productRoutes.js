const express = require("express");
const { productController } = require("../controllers/productController");

//router object
const router = express.Router();

//routes

//Add Product - Type: POST
router.post("/addproduct", productController);

module.exports = router;
