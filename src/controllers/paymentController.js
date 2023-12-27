
const paypal = require('paypal-rest-sdk');
require('dotenv').config();
const Order = require('../models/orderModel');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

paypal.configure({
  'mode': PAYPAL_MODE,
  'client_id': PAYPAL_CLIENT_KEY,
  'client_secret': PAYPAL_SECRET_KEY
});

const isValidObjectId = mongoose.Types.ObjectId.isValid;

const payProduct = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: 'Invalid Order ID' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { total_price } = order;

    const create_payment_json = {
      "intent": "sale",
      "payer": { "payment_method": "paypal" },
      "redirect_urls": {
        "return_url": "http://localhost:3000/api/success/" + orderId,
        "cancel_url": "http://localhost:3000/api/cancel/" + orderId
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "Products",
            "sku": "001",
            "price": total_price.toFixed(2),
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": { "currency": "USD", "total": total_price.toFixed(2) },
        "description": "Purchase of products"
      }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        throw error;
      } else {
        res.json({ approvalUrl: payment.links.find(link => link.rel === 'approval_url').href });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

const executePayment = async (PayerID, paymentId, orderId, res) => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { total_price } = order;

    const execute_payment_json = {
      "payer_id": PayerID,
      "transactions": [{
        "amount": { "currency": "USD", "total": total_price.toFixed(2) }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        console.error(error.response);
        throw error;
      } else {
        console.log('Payment executed successfully');
        console.log('Payment details:', JSON.stringify(payment));

        res.send('Payment Successful');
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

const cancelPage = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: 'Invalid Order ID' });
    }

    res.send('Payment Canceled');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};


const payWithStripe = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: 'Invalid Order ID' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { total_price } = order;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_price * 100), 
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: 'pm_card_visa', 
    });

    console.log('PaymentIntent confirmed:', confirmedPaymentIntent);

    res.json({ message: 'Stripe Payment Successful', paymentIntent: confirmedPaymentIntent });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  payWithStripe,
  payProduct,
  executePayment,
  cancelPage,
};