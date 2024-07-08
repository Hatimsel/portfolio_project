import express from 'express';
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users.js';
import categoryRouter from './routes/categories.js';
import productRouter from './routes/products.js';
import orderRouter from './routes/orders.js';
import dbClient from './utils/db.js';
import redisClient from './utils/redis.js';

const app = express();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

export async function isAuthenticated(req, res, next) {
    const { token } = req.cookies;

    try {
        const userId = await redisClient.get(token);
        // const session = await dbClient.db.collection('sessions').findOne({
        //     token
        // });
        if (!userId) return res.status(403).send({
            error: "Unauthorized"
        });
        const user = await dbClient.userCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } }
        );
        if (!user) return res.status(403).send({
            error: "Unauthorized"
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(403).send({
            error: "Forbidden"
        });
    }
}

app.get('/home', (req, res) => res.send('Welcome to Crumble!'));

app.listen(port, () => {
    console.log(`Crumble starting at http://${host}:${port}`);
});
