import { Router } from "express";
import ValidateInput from "../middlewares/ValidateInput.js";
import { Login, Register } from "../validators/AuthValidators.js";
import { loginController, registerController, updateController } from "../controllers/userController.js";
import ValidateUser from "../middlewares/ValidateUser.js";

const router = Router();

router.post("/register", ValidateInput(Register), registerController);

router.post("/login", ValidateInput(Login), loginController);

router.put('/updateProfile', ValidateUser, updateController);

export default router;
