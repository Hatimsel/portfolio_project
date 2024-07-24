const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  date: { type: Date, required: true },
  adults: { type: Number, required: true, min: 1 },
  enfants: { type: Number, required: true, min: 0 },
  hours: { type: String, required: true },
  note: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Reservations', reservationSchema);
