import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import router from './routes/auth.js';
import userRouter from './routes/users.js';
import productRouter from './routes/products.js';
import orderRouter from './routes/orders.js';
import categoryRouter from './routes/categories.js';
import reviewRouter from './routes/reviews.js';
import restaurantRouter from './routes/restaurants.js';
import customerRouter from './routes/customers.js';
import deliveryRouter from './routes/deliveries.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', router);
app.use('/users', userRouter);
app.use('/users/products', productRouter);
app.use('/users/orders', orderRouter);
app.use('/users/reviews', reviewRouter);
app.use('/users/categories', categoryRouter);
app.use('/restaurants', restaurantRouter);
app.use('/customers', customerRouter);
app.use('/delivery', deliveryRouter);

app.get('/home', (req, res) => res.send('Welcome to Crumble!'));

app.listen(port, () => {
    console.log(`Crumble starting at http://${host}:${port}`);
});
