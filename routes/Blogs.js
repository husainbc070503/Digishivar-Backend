import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isFarmer from "../middlewares/isFarmer.js";
import isCustomer from "../middlewares/isCustomer.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  likeBlog,
  unlikeBlog,
  addComment,
  deleteComment,
} from "../controllers/crudBlog.js";

const router = Router();

router.post("/createBlog", ValidateUser, isFarmer, createBlog);

router.put("/updateBlog/:id", ValidateUser, isFarmer, updateBlog);

router.delete("/deleteBlog/:id", ValidateUser, isFarmer, deleteBlog);

router.get("/blogs", ValidateUser, getBlog);

router.put("/likeBlog/:id", ValidateUser, isCustomer, likeBlog);

router.put("/dislikeBlog/:id", ValidateUser, isCustomer, unlikeBlog);

router.put("/addComment/:id", ValidateUser, isCustomer, addComment);

router.put("/deleteComment/:id/:cid", ValidateUser, isCustomer, deleteComment);

export default router;
