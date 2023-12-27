
const express = require('express');
const payment_route = express.Router();
const paymentController = require('../controllers/paymentController');

payment_route.post('/pay/:orderId', paymentController.payProduct);
payment_route.get('/success/:orderId', (req, res) => {
  const { PayerID ,paymentId} = req.query;
  const { orderId } = req.params; 
  paymentController.executePayment(PayerID, paymentId, orderId, res);
});

payment_route.get('/cancel/:orderId', paymentController.cancelPage);


payment_route.post('/paystripe/:orderId', paymentController.payWithStripe);


module.exports = payment_route;
