import authRouter from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from "openai";
import openaiRouter from "./routes/openai.js";

// GLOBAL CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// OPEN AI CONFIGURATION
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ROUTES 
app.use("/openai", openaiRouter);
app.use("/auth", authRouter);

// SERVER CONFIGURATION
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting at http://localhost:${port}`);
});
