// controllers/paymentController.js
const stripe = require('../../config/stripe');
const Order = require('../../models/orderModel');

const createPaymentIntent = async (req, res) => {
  try {
    const { products, totalPrice, user, address } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'inr',
      description: 'Payment for goods',
      metadata: { integration_check: 'accept_a_payment' },
      billing_details: {
        name: `${user.firstName} ${user.lastName}`,
        address: {
          line1: address.street,
          city: address.city,
          state: address.state,
          postal_code: address.postalCode
        }
      }
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, user, products, totalPrice, address } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const newOrder = new Order({
        userId: user._id,
        items: products,
        totalPrice,
        address,
        status: 'paid',
      });

      const savedOrder = await newOrder.save();
      res.status(200).json({ success: true, order: savedOrder });
    } else {
      res.status(400).json({ success: false, message: 'Payment not confirmed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
};
