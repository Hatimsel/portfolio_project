import express from 'express';
import ProductController from '../controllers/productController.js';
import { isAuthenticated } from '../middleware/auth.js';
import isOwner from '../middleware/owner.js';

const productRouter = express.Router();

productRouter.get('/', isAuthenticated, ProductController.getProducts);

productRouter.get('/:id', isAuthenticated, ProductController.getProduct);

productRouter.post('/new', isAuthenticated, isOwner, ProductController.newProduct);

productRouter.delete('/:id', isAuthenticated, isOwner, ProductController.deleteProduct);

export default productRouter;
