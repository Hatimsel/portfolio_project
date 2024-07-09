import dbClient from '../utils/db.js';
import { ObjectId } from 'mongodb';

class BaseClass {
    constructor() {};

    async postNew(collection) {
        try {
            await dbClient.db.collection(collection).insertOne(this);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    async findById(id, collection) {
        try {
            const object = await dbClient.db.collection(collection).findOne({
                _id: new ObjectId(id)
            });
            return object;
        } catch (err) {
            console.error(err);
        }
    }

    async deleteById(id, collection) {
        try {
            await dbClient.db.collection(collection).deleteOne({
                _id: new ObjectId(id)
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async getAll(collection, userId='') {
        const collectionWithUserId = ['product', 'order', 'review'];
        try {
            if (collectionWithUserId.includes(collection)) {
                const objectsCursor = dbClient.db.collection(collection).find({
                    userId: new ObjectId(userId)
                });
                const objects = await objectsCursor.toArray();
                return objects;
            } else if (collection === 'user') {
                const objectsCursor = dbClient.db.collection('user').find(
                    {},
                    { projection: { password: 0 }}
                );
                const objects = await objectsCursor.toArray();
                return objects;
            }
            const objectsCursor = dbClient.db.collection(collection).find();
            const objects = await objectsCursor.toArray();
            return objects;
        } catch (err) {
            console.error(err);
        }
    }
}

export class User extends BaseClass {
    image = ''
    addresses = []
    reviews = []
    
    constructor(email, password, type) {
        super();
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static async findByEmail(email) {
        try {
            const user = await dbClient.userCollection.findOne({
                email
            });

            return user;
        } catch (err) {
            console.error(err);
        }
    }

    addAddress(address) {
        this.addAddress.push(address);
    }

    addReview(review) {
        this.reviews.push(review);
    }
}

export class Category extends BaseClass {
    image = ''

    constructor(title, description = '') {
        super();
        this.title = title;
        this.description = description;
    }

    // addProduct(product) {
    //     this.products.push(product);
    // }

    // deleteProduct(product) {
    //     this.products = this.products
    //                     .filter(item => item !== product);
    // }
}

export class Product extends BaseClass {
    image = ''
    category = ''
    description  = ''

    constructor(title, price, userId) {
        super();
        this.title = title;
        this.price = price;
        this.userId = userId;
    }

    addDescription(description) {
        this.description = description;
    }

    addCategory(category) {
        this.category = category;
    }
}

export class Order extends BaseClass {
    shippedAt = '';
    deliveredAt = '';

    constructor(productId, userId) {
        super();
        this.productId = productId;
        this.userId = userId;
        this.status = 'Processing';
        this.placedAt = new Date();
    }

    isShipped() {
        this.status = 'Shipped';
        this.shippedAt = new Date();
    }

    isDelivered() {
        this.status = 'Delivered';
        this.deliveredAt = new Date();
    }
}

export class Review extends BaseClass {
    userId;

    constructor(orderId, feedback, stars) {
        super();
        this.orderId = orderId;
        this.feedback = feedback;
        this.stars = stars;
    }
}

export const baseModel = new BaseClass();
