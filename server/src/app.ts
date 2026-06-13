import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes"
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigin = process.env.CLIENT_URL;

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("*", (_, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

app.use(errorMiddleware);

export default app;
