const reservationService = require('../services/reservation_service');

const createReservation = async (req, res) => {
  try {
    const userId = decoded.id;
    const reservationData = {...req.body, userId: userId};
    const reservation = await reservationService.addReservation(reservationData);
    return res.status(201).json(reservation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createReservation,
};
