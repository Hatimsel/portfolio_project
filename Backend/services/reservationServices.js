const Reservation = require('../models/resrvationModel');

const addReservation = async (reservationData) => {
  try {
    const reservation = new Reservation({
      user: reservationData.userId,
      date: reservationData.date,
      adults: reservationData.adults,
      enfants: reservationData.enfants,
      hours: reservationData.hours,
      note: reservationData.note,
      type: reservationData.type,
    });
    console.log('reservationData.date', reservationData.userId);
    await reservation.save();
    return reservation;
  } catch (err) {
    throw new Error('Failed to save reservation: ' + err.message);
  }
};

module.exports = {
  addReservation,
};
