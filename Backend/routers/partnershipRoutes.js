const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/partnershipController');

router.post('/partnership', partnershipController.submitRequest);

module.exports = router;
