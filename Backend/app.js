import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
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
import RestaurantController from './controllers/restaurantController.js';
import dotenv from 'dotenv';
import firebase from 'firebase-admin';
import serviceAccount from '../crumble-3dfef-firebase-adminsdk-b45hh-886066470d.json';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

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

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    socket.on('message', msg => {
        console.log('Message received:', msg);

        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnect: ', socket.id);
    });
});

app.get('/home', RestaurantController.allRestaurants);

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5000;
server.listen(port, () => {
    console.log(`Crumble starting at http://${host}:${port}`);
});