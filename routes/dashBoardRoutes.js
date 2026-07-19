import express from "express";
import authMiddleware from "../middleware/authMiddlerware.js";
import { getDashboardSummary } from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboardSummary);

export default router;