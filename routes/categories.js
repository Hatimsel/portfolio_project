import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/', CategoryController.postCategory);

categoryRouter.get('/', CategoryController.getAll);

categoryRouter.get('/:id', CategoryController.getCategory);

categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
