import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Initialize database connection
let dbConnected = false;

const initDB = async () => {
    try {
        await connectMongoDB();
        dbConnected = true;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        dbConnected = false;
    }
};

// Add middleware to check DB connection for API routes
app.use('/api', (req, res, next) => {
    if (!dbConnected) {
        return res.status(503).json({
            error: "Database connection not available",
            message: "Please try again in a few moments"
        });
    }
    next();
});

// Initialize DB connection
initDB();

// Start server for local development
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export for Vercel
export default app;