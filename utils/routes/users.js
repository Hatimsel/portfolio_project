import express from 'express';
import UserController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', UserController.allUsers);

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.logIn);

userRouter.get('/logout', UserController.logOut);

userRouter.get('/:id', UserController.getUser);

userRouter.patch('/:id', UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
// export userRouter;
