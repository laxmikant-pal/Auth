const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;


const orderSchema = new mongoose.Schema(
    {
      
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide a user ID"],
      },
      status: {
        type: String,
        required: [true, "Please provide status"],
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            min: [1, "Quantity must be at least 1"],
          },
          selectedSize: String,
          selectedColor: String,
          cartedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      total_price: {
        type: Number,
        required: [true, "Provide a total price"],
      },
      discount: {
        type: Number,
        default: 0,
      },
      paymentId: {
        type: String,
        required: [true, "Provide a payment ID"],
      },
      paymentMethod: String,
      transactionDate: {
        type: Date,
        default: Date.now,
      },
      response: String,
      couponId: String,
      trackingId: String,
      addressDetails: {
        phoneNo: String,
        address: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );
  
  const Orders = mongoose.model("Order", orderSchema);
  
  module.exports = Orders;
  