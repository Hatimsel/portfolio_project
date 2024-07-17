const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservationModel');

router.post('/reservations', async (req, res) => {
    const { userId, ...reservationDetails } = req.body;

    try {
        if (!userId) {
            return res.status(400).send({ error: "User ID is required" });
        }
        const reservation = new Reservation({
            ...reservationDetails,
            user: userId 
        });

        await reservation.save();
        
        return res.status(201).send(reservation);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.get('/reservations', async (req, res) => {
    const userId = req.query.userId;

    try {
        if (!userId) {
            return res.status(400).send({ error: "User ID is required" });
        }

        const reservations = await Reservation.find({ user: userId });

        return res.send(reservations);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;
