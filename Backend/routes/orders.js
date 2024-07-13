import express from 'express';
import OrderController from '../controllers/orderController.js';
import { isAuthenticated } from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuthenticated, OrderController.getOrders);

orderRouter.post('/new', isAuthenticated, OrderController.newOrder);

orderRouter.get('/:id', isAuthenticated, OrderController.getOrder);

orderRouter.delete('/:id', isAuthenticated, OrderController.deleteOrder);

export default orderRouter;
