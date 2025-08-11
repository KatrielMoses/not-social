import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("MongoDB URI exists:", !!process.env.MONGODB_URI);

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not set");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB Connected: ", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to the DB: ", error.message);
        console.error("Full error:", error);
        throw error; // Don't exit in serverless, just throw
    }
}

export default connectMongoDB;