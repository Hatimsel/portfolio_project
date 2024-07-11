import express from 'express';
import UserController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/logout', isAuthenticated, UserController.logOut);

userRouter.get('/profile', isAuthenticated, UserController.userProfile);

userRouter.delete('/deleteprofile', isAuthenticated, UserController.deleteUser);

userRouter.get('/', isAuthenticated, UserController.allUsers);

export default userRouter;