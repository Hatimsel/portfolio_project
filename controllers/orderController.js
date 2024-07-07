import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import { Order } from './models.js';

export default class OrderController {
    static async postOrder(req, res) {
        const { productId, userId } = req.body;
        const newOrder = new Order(productId, userId);

        dbClient.orderCollection.insertOne(newOrder)
            .then((data) => {
                console.log(data);
                return res.status(201).send({
                    Message: 'Order placed successffully'
                });
            }).catch((err) => {
                console.error(err);
                return res.status(400).send({
                    error: 'A problem occurred'
                });
            });
    }

    static getOrder(req, res) {
        const { id } = req.params;

        dbClient.orderCollection.findOne({
            _id: new ObjectId(id)
        }).then((data) => {
            console.log(data);
            return res.status(200).send(data);
        }).catch((err) => {
            console.error(err);
            return res.status(404).send({
                error: 'Not found'
            });
        });
    }

    static async getAll(req, res) {
        const orders = dbClient.orderCollection.find();
        orders.toArray()
            .then((data) => {
                console.log(data);
                return res.status(200).send(data);
            }).catch((err) => {
                console.error(err);
                return res.send(404).send({
                    error: 'Not found'
                });
            });
    }

    static deleteOrder(req, res) {
        const { id } = req.params;

        dbClient.orderCollection.deleteOne({
            _id: new ObjectId(id)
        }).then((data) => {
            console.log(data);
            return res.status(200).send({
                Message: 'Order deleted successfully'
            });
        }).catch((err) => {
            console.error(err);
            return res.status(404).send({
                error: 'Order not found'
            });
        });
    }
}
