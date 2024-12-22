import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // Add for graceful shutdown

import { Connection } from "./database/db.js"; // Named import for Connection
import Route from "./routes/route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", Route);

// Environment Variable Validation
if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
  console.error("Database credentials are not defined in the .env file.");
  process.exit(1);
}

const PORT = process.env.PORT || 8000;

// Database Connection
const connectToDatabase = async () => {
  try {
    await Connection();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

connectToDatabase();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.disconnect();
  process.exit(0);
});
