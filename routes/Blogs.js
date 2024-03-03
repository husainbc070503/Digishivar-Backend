import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
} from "../controllers/crudBlog.js";
const router = Router();

router.post("/createBlog", ValidateUser, isFarmer, createBlog);

router.put("/updateBlog/:id", ValidateUser, isFarmer, updateBlog);

router.delete("/deleteBlog/:id", ValidateUser, isFarmer, deleteBlog);

router.get("/blogs", ValidateUser, isFarmer, getBlog);

export default router;
