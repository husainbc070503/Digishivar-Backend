import { Router } from "express";
import ValidateUser from "../middlewares/ValidateUser.js";
import isCustomer from "../middlewares/isCustomer.js";
import {
  addToList,
  createList,
  deleteList,
  removeFromList,
} from "../controllers/wishlistController.js";

const route = Router();

route.post("/createList", ValidateUser, isCustomer, createList);

route.put("/addToList/:id/:pid", ValidateUser, isCustomer, addToList);

route.put("/removeFromList/:id/:pid", ValidateUser, isCustomer, removeFromList);

route.delete("/deleteList/:id", ValidateUser, isCustomer, deleteList);
export default route;
