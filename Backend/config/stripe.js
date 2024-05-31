// config/stripe.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;

// config/stripe.js

// const stripe = new Stripe('your-secret-key-here'); // Replace with your Stripe secret key
// module.exports = stripe;
