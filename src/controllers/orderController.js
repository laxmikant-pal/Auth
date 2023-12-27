
const mongoose = require('mongoose');
const Orders = require('../models/orderModel');
const User = require('../models/user');


exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    // console.log('User ID:', userId);
    const user = await User.findById(userId);
    // console.log('Found User:', user);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order = new Orders({
      user: userId,
      status: req.body.status, 
      products: user.cart, 
      total_price: req.body.total_price, 
      discount: req.body.discount || 0,
      paymentId: req.body.paymentId,
      paymentMethod: req.body.paymentMethod,
      response: req.body.response,
      couponId: req.body.couponId,
      trackingId: req.body.trackingId,
      addressDetails: {
        phoneNo: user.ShippingAddress.phoneNo,
        address: user.ShippingAddress.address,
        city: user.ShippingAddress.city,
        state: user.ShippingAddress.state,
        postalCode: user.ShippingAddress.postalcode,
        country: user.ShippingAddress.country,
      },
    });

    await order.save();

    user.cart = [];
    user.ShippingDetails = true;
    await user.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.displayOrders = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const result = await Orders.find({})
      .skip((Number(page) - 1) * limit)
      .limit(limit)
      .sort("-updatedAt")
      .populate('user');

    const count = await Orders.estimatedDocumentCount();

    res.status(200).json({ orders: result, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



