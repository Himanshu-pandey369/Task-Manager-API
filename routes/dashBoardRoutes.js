import express from "express";
import authMiddleware from "../middleware/authMiddlerware.js";
import {
  getDashboardSummary,
  getCategoryExpenses,
  getMonthlyExpenses,
  getRecentTransactions,
} from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboardSummary);

router.get("/category-expenses", authMiddleware, getCategoryExpenses);

router.get("/monthly-expenses", authMiddleware, getMonthlyExpenses);

router.get("/recent-transactions", authMiddleware, getRecentTransactions);

export default router;