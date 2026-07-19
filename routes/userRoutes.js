import express from "express";
import authMiddleware from "../middleware/authMiddlerware.js";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

export default router;