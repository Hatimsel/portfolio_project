import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import { isAuthenticated } from '../app.js';

const categoryRouter = express.Router();

categoryRouter.post('/newcategory', isAuthenticated, CategoryController.postCategory);

categoryRouter.get('/', CategoryController.getAll);

categoryRouter.get('/:id', CategoryController.getCategory);

categoryRouter.delete('/:id', isAuthenticated, CategoryController.deleteCategory);

export default categoryRouter;
