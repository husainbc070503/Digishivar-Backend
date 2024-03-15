import { Router } from "express";
import ValidateInput from "../middlewares/ValidateInput.js";
import { Login, Register, SendEmail, UpdatePassword } from "../validators/AuthValidators.js";
import { getUsersController, loginController, registerController, sendMail, updateController, updatePassword } from "../controllers/userController.js";
import ValidateUser from "../middlewares/ValidateUser.js";

const router = Router();

router.post("/register", ValidateInput(Register), registerController);

router.post("/login", ValidateInput(Login), loginController);

router.put('/updateProfile', ValidateUser, updateController);

router.get('/users', ValidateUser, getUsersController);

router.post('/sendOtp', ValidateInput(SendEmail), sendMail);

router.put('/updatePassword', ValidateInput(UpdatePassword), updatePassword)

export default router;
