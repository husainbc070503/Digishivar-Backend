const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes

//Register - Type: POST
router.post("/register", registerController);

//Login - Type: POST
router.post("/login", loginController);

module.exports = router;
