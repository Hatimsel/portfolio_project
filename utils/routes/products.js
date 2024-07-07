import express from 'express';
import ProductController from '../controllers/productConstroller.js';

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);

productRouter.post('/newproduct', ProductController.postProduct);

productRouter.get('/:id', ProductController.getProduct);

productRouter.delete('/:id', ProductController.deleteProduct);

export default productRouter;
