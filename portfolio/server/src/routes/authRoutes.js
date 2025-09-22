import express from "express";
import { registerUser, authUser } from "#app/controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);

export default router;
