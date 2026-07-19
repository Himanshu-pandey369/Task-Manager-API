import express from "express";
import { 
  createTransaction, 
  getTransactions,
  deleteTransaction
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddlerware.js";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);

router.get("/", authMiddleware, getTransactions);

router.delete("/:id", authMiddleware, deleteTransaction);
export default router;