import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);

authRouter.post("/signup", AuthController.signUp);

export default authRouter;
