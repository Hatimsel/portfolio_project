import express from 'express';
import ProductController from '../controllers/productConstroller.js';

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);

// productRouter.post('/newproduct', isAuthenticated, ProductController.postProduct); migrated to userRouter

productRouter.get('/:id', ProductController.getProduct);

// productRouter.delete('/:id', isAuthenticated, ProductController.deleteProduct);

export default productRouter;
