import express from 'express';
import OrderController from '../controllers/orderController.js';
import { Order } from '../controllers/models.js';

const orderRouter = express.Router();

orderRouter.get('/', OrderController.getAll);

orderRouter.post('/neworder', OrderController.postOrder);

orderRouter.get('/:id', OrderController.getOrder);

orderRouter.delete('/:id', OrderController.deleteOrder);

export default orderRouter;
