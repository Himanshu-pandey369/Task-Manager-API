import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app;