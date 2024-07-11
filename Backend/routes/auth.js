import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

// Register user
router.post('/register', UserController.register);

// Login user
router.post('/login', UserController.login);

export default router;
