const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  date: { type: Date, required: true },
  adults: { type: Number, required: true, min: 1 },
  enfants: { type: Number, required: true, min: 0 }, // Assuming zero children is valid
  hours: { type: String, required: true },
  note: String,
 // type: { type: String, required: true, enum: ['Confirme', 'En_attente', 'Refuse'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Reservations', reservationSchema);