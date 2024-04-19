import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

const router = Router();

// INSERT An Employee
router.post("/users", createUser);

// GET all Users
router.get("/users", getUsers);

// GET An User
router.get("/users/:id", getUser);

// PATCH an User
router.patch("/users/:id", updateUser);

// DELETE An Employee
router.delete("/users/:id", deleteUser);


export default router;