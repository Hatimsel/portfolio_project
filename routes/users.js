import express from 'express';
import UserController from '../controllers/userController.js';
import { isAuthenticated } from '../app.js';

const userRouter = express.Router();

userRouter.get('/', isAuthenticated, UserController.allUsers);

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.logIn);

userRouter.get('/logout', isAuthenticated, UserController.logOut);

userRouter.get('/profile', isAuthenticated, UserController.userProfile);

userRouter.patch('/updateprofile', isAuthenticated, UserController.updateUser);

userRouter.delete('/deleteprofile', isAuthenticated, UserController.deleteUser);

userRouter.get('/myproducts', isAuthenticated, UserController.getProducts);

userRouter.get('/myorders', isAuthenticated, UserController.getOrders);

userRouter.get('/myreviews', isAuthenticated, UserController.getReviews);

export default userRouter;
// export userRouter;
