
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');


router.post('/create/:userId', ordersController.createOrder);

router.get('/orders', ordersController.displayOrders);

module.exports = router;
