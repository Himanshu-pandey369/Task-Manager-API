import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/BudgetRoute.js";
import dashboardRoutes from "./routes/dashBoardRoutes.js";
import userRoutes from "./routes/userRoutes.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ]
  })
);

app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app;