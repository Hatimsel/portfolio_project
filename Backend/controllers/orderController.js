import Order from '../models/order.js';
import redisClient from '../utils/redis.js';

export default class ProductController {
    static async newOrder(req, res) {
        const { productId } = req.body;
        const { token } = req.cookies;
    
        if (!productId) {
          return res.status(400).send({
            error: "Please provide a valid productId"
          });
        }
    
        try {
            const userId = await redisClient.get(token);
            const newOrder = new Order({ productId, userId });

            if (newOrder.save()) {
              return res.status(201).send({
                Message: "Order placed successfully"
              });
            }
            return res.status(400).send({
              Message: "Something went wrong"
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                error: "Operation failed"
            });
        }
    }
    
    static async getOrder(req, res) {
        const { id } = req.params;
        // const { token } = req.cookies;
    
        try {
            // const userId = await redisClient.get(token);
            // this should be found by id and userId => fixing that later
            const order = await Order.findOne({ _id: id });
            if (!order) {
              return res.status(404).send({ error: 'Order not found' });
            }
    
            return res.status(200).send(order);
        } catch (err) {
            console.error(err);
            return res.status(404).send({
                error: 'Not found'
            });
        }
    }
    
    static async deleteOrder(req, res) {
        const { id } = req.params;

        const deleted = await Order.deleteOne({ _id: id });
        if (deleted.deletedCount > 0) {
          return res.status(200).send({
            Message: 'Order deleted successfully'
          });
        }
        return res.status(404).send({
          error: 'Order not found'
        });
    }
    
    static async getOrders(req, res) {
        const { token } = req.cookies;
    
        try {
          const userId = await redisClient.get(token);
          const orders = await Order.find({ userId });
    
          if (orders) {
            return res.status(200).send(orders);
          }
    
          return res.status(404).send({
            error: "No order found"
          });
        } catch (err) {
          console.error(err);
          return res.status(500).send({
            error: "Server error"
          });
        }
    }
}
