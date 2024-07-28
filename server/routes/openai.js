import express from "express";
import OpenAiController from "../controllers/openaiController.js";

const openaiRouter = express.Router();

openaiRouter.post("/text", OpenAiController.text);

openaiRouter.post("/code", OpenAiController.code);

openaiRouter.post("/assist", OpenAiController.assist);

export default openaiRouter;
