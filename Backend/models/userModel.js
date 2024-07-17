const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: "active" },
    role: { type: String, default: "" } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
//reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }];

// const reservationSchema = new Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', required: true
//     },
// });
