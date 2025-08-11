import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB Connected: ", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to the DB: ", error.message);
        process.exit(1);
    }
}

export default connectMongoDB;