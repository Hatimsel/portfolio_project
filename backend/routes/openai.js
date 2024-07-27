import express from "express";
import OpenAiController from "../controllers/openaiController.js";

const router = express.Router();

router.post("/text", OpenAiController.text);

router.post("/code", OpenAiController.code);

router.post("/assist", OpenAiController.assist);

export default router;
