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

    static async getOrder(req, res) {
        const { id } = req.params;
        const { token } = req.cookies;

        try {
            const session = await dbClient.sessions.findOne({
                token
            });
            dbClient.orderCollection.findOne({
                _id: new ObjectId(id),
                userId: session.userId
            }).then((data) => {
                console.log(data);
                return res.status(200).send(data);
            });
        } catch (err) {
            console.error(err);
            return res.status(404).send({
                error: 'Not found'
            });
        }
    }

    static async myOrders(req, res) {
        const { token } = req.cookies;

        try {
            const session = await dbClient.sessions.findOne({
                token
            });
            const user = await dbClient.userCollection.findOne({
                _id: session.userId
            });

            const ordersCursor = await dbClient.orderCollection.findOne({
                userId: user._id
            });

            const orders = await ordersCursor.toArray();

            return res.status(200).send(orders);
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                error: "Server Error"
            });
        }
        // const orders = dbClient.orderCollection.find();
        // orders.toArray()
        //     .then((data) => {
        //         console.log(data);
        //         return res.status(200).send(data);
        //     }).catch((err) => {
        //         console.error(err);
        //         return res.send(404).send({
        //             error: 'Not found'
        //         });
        //     });
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
