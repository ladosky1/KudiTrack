import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import { connectDB } from "./config/db";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server Running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error("server startup failed", error);

        process.exit(1);
    }
}

startServer();

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected");
    process.exit(0);
})