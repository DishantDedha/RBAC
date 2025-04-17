// authRouter.js
import express from "express";
import { registerUser,loginUser } from "../controllers/userController.js";
import { createRole, assignRoleToUser } from "../controllers/roleController.js";
import protect from "../middlewares/authMiddleware.js"
import roleAuthorization  from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Role routes (protected and authorized)
router.post("/create", protect, roleAuthorization(["admin"]), createRole);
router.post("/assign", protect, roleAuthorization(["admin"]), assignRoleToUser);

export default router;
