import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import { isAuthenticated } from '../middleware/auth.js';

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAll);

categoryRouter.post('/new', isAuthenticated, CategoryController.newCategory);

categoryRouter.get('/:id', CategoryController.getCategory);

categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
