import express from 'express';
import CustomerController from '../controllers/customerController.js';

const customerRouter = express.Router();

customerRouter.get('/', CustomerController.allCustomers);

customerRouter.get('/:id', CustomerController.getCustomer);

export default customerRouter;
