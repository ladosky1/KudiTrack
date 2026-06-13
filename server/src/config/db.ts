import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(
            process.env.MONGO_URI as string,
        );

        console.log("MongoDb connected")
    } catch (error) {
        console.error("MongoDb Connection Failed", error);

        process.exit(1);
    }
}