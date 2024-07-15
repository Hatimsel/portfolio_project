const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/user_route");
const partnershipRoutes = require('./routers/partnership_routes');
const reservationRoutes = require('./routers/reservationRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/', userRouter);

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//         return res.status(401).send({ error: "Authentication failed" });
//     }
    
//     return res.send({ status: "success", userId: user._id.toString() });
// });

app.use('/api', partnershipRoutes);
app.use('/api', reservationRoutes);

module.exports = app;
