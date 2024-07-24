const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const partnershipRoutes = require('./routers/partnershipRoutes');
const reservationRoutes = require('./routers/reservationRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/', userRouter);

app.use('/api', partnershipRoutes);
app.use('/api', reservationRoutes);

module.exports = app;
