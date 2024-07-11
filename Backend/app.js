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

app.get('/home', (req, res) => res.send('Welcome to Crumble!'));

app.listen(port, () => {
    console.log(`Crumble starting at http://${host}:${port}`);
});
