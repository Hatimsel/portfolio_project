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

userRouter.post('/newcategory', isAuthenticated, UserController.newCategory);

userRouter.delete('/categories/:id', isAuthenticated, UserController.deleteCategory);

userRouter.post('/newproduct', isAuthenticated, UserController.newProduct);

userRouter.get('/myproducts', isAuthenticated, UserController.getProducts);

userRouter.get('/myproducts/:id', isAuthenticated, UserController.getProduct);

userRouter.delete('/myproducts/:id', isAuthenticated, UserController.deleteProduct);

userRouter.post('/neworder', isAuthenticated, UserController.newOrder);

userRouter.get('/myorders', isAuthenticated, UserController.getOrders);

userRouter.get('/myorders/:id', isAuthenticated, UserController.getOrder);

userRouter.delete('/myorders/:id', isAuthenticated, UserController.deleteOrder);

userRouter.post('/newreview', isAuthenticated, UserController.newReview);

userRouter.get('/myreviews', isAuthenticated, UserController.getReviews);

export default userRouter;
// export userRouter;
