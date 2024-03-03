import { Router } from "express";
import ValidateInput from "../middlewares/ValidateInput.js";
import { Login, Register } from "../validators/AuthValidators.js";

const {
  registerController,
  loginController,
} = require("../controllers/userController");

//router object
const router = Router();

//routes

//Register - Type: POST
router.post("/register", ValidateInput(Register), registerController);

//Login - Type: POST
router.post("/login", ValidateInput(Login), loginController);

module.exports = router;
