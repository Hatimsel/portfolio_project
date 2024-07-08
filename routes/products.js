import express from 'express';
import ProductController from '../controllers/productConstroller.js';
import { isAuthenticated } from '../app.js';

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);

productRouter.post('/newproduct', isAuthenticated, ProductController.postProduct);

productRouter.get('/:id', ProductController.getProduct);

productRouter.delete('/:id', isAuthenticated, ProductController.deleteProduct);

export default productRouter;
