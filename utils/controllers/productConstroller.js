import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import { Product } from './models.js';

export default class ProductController  {
    static async postProduct(req, res) {
        const { title, price } = req.body;
        try {
            const product = new Product(title, price);
            const newProduct = await dbClient.productCollection.insertOne(product);
            if (!newProduct) {
                return res.status(403).send(
                    { error: `Operation failed` }
                );
            }
            return res.status(201).send(
                { Message: `Product ${title} added successfully` }
            );
        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Server error' });
        }
    }

    static async getAll(req, res) {
        try {
            const resultsCursor = dbClient.productCollection.find();
            const products = await resultsCursor.toArray();

            if (!products) {
                return res.status(403).send(
                    { error: `Operation failed` }
                );
            }

            return res.status(200).send(products);
        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Server error' });
        }
    }

    static async getProduct(req, res) {
        const { id } = req.params;
        const _id = new ObjectId(id);

        try {
            const product = dbClient.productCollection.findOne(_id);

            if (!product) {
                return res.status(404).send({ error: 'Product not found' });
            }

            return res.status(200).send(product);
        } catch(err) {
            console.error(err);
            return res.status(500).send({ error: 'Server error' });
        }
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;

        dbClient.productCollection.deleteOne({
            _id: new ObjectId(id)
        }).then ((data) => {
            console.log(data);
            return res.status(203).send(
                { Message: `Product deleted successfully` }
            );
        }).catch((err) => {
            console.error(err);
            return res.status(404).send({ error: 'Product not found' });
        })
    }
}
