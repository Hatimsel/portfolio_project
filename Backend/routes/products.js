import express from 'express';
import ProductController from '../controllers/productController.js';
import { isAuthenticated } from '../middleware/auth.js';

const productRouter = express.Router();

productRouter.get('/', isAuthenticated, ProductController.getProducts);

productRouter.get('/:id', isAuthenticated, ProductController.getProduct);

productRouter.post('/new', isAuthenticated, ProductController.newProduct);

productRouter.delete('/:id', isAuthenticated, ProductController.deleteProduct);

export default productRouter;
