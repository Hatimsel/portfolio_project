import express from 'express';
import UserController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/logout', UserController.logOut);

userRouter.get('/profile', UserController.userProfile);

userRouter.delete('/deleteprofile', UserController.deleteUser);

userRouter.get('/', UserController.allUsers);

userRouter.post('/addaddress', UserController.addAddress);

export default userRouter;
