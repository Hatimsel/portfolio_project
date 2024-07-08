import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';

export default class CategoryController {
    static async getAll(req, res) {
        try {
            const categoriesCursor = dbClient.categoryCollection.find(
                {}
            );
            const categories = await categoriesCursor.toArray();

            return res.status(200).send(categories);
        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Server error' });
        }
    }

    static async getCategory(req, res) {
        const { id } = req.params;

        try {
            const category = await dbClient.categoryCollection.findOne(
                { _id: new ObjectId(id) }
            );
            res.status(200).send(category);
        } catch(err) {
            console.error(err);
            return res.status(500).send({ error: 'Server error' });
        }
    }
}
