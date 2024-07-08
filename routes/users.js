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

userRouter.get('/myproducts/:id', isAuthenticated, UserController.getProduct);

userRouter.post('/newproduct', isAuthenticated, UserController.newProduct);

userRouter.delete('/myproducts/:id', isAuthenticated, UserController.deleteProduct);

userRouter.get('/myorders', isAuthenticated, UserController.getOrders);

userRouter.get('/myorders/:id', isAuthenticated, UserController.getOrder);

userRouter.post('/neworder', isAuthenticated, UserController.newOrder);

userRouter.delete('/myorders/:id', isAuthenticated, UserController.deleteOrder);

userRouter.get('/myreviews', isAuthenticated, UserController.getReviews);

userRouter.post('/newreview', isAuthenticated, UserController.newReview);

export default userRouter;
// export userRouter;
