import express from "express";
import authMiddleware from "../middleware/authMiddlerware.js";
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

router.post("/create", authMiddleware, createBudget);

router.get("/", authMiddleware, getBudgets);

router.put("/:id", authMiddleware, updateBudget);

router.delete("/:id", authMiddleware, deleteBudget);

export default router;