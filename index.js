import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";
import loggerMiddleware from "./middleware/logger.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import rateLimit from "./middleware/ratelimit.middleware.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);
app.use(loggerMiddleware);

// Routes
app.get("/", asyncHandler(async (req, res) => {
  res.json({ message: "Welcome to the API", version: "1.0.0" });
}));

app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/health", asyncHandler(async (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
}));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Connect to database and start server
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      // Connect to MongoDB
      await connectDB();

      const server = app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
      });

      // Handle server errors
      server.on("error", (error) => {
        logger.error(`Server error: ${error.message}`);
      });
    } catch (error) {
      logger.error(`Failed to start server: ${error.message}`);
    }
  };

  startServer();
} else {
  // For Vercel/production, just connect to DB
  connectDB().catch((error) => {
    logger.error(`Failed to connect to database: ${error.message}`);
  });
}

// Handle unhandled rejections and exceptions
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
});

// Export app for Vercel serverless
export default app;
