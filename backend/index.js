import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import OpenAI from "openai";

dotenv.config();

// GLOBAL CONFIGURATIONS
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// OPEN AI CONFIGURATION
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ROUTES 
app.use("/auth", authRoutes);

// SERVER CONFIGURATION
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
