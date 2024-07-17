const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/api',userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
