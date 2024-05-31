const Order = require('../../models/orderModel');
const Product = require('../../models/productModel');
const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suraj9850868643@gmail.com', // your Gmail address
    pass: 'smfevvyvorvaliar' // your Gmail password
  }
});

// Function to send no-reply email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'no-reply@example.com',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const createOrder = async (req, res) => {
  try {
    const { user, products, totalPrice, address, contact } = req.body;

    // Fetch detailed product info if only IDs are provided
    const detailedProducts = await Promise.all(products.map(async (product) => {
      const productDetails = await Product.findById(product.productId);
      if (!productDetails) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }
      return {
        productId: productDetails._id,
        name: productDetails.productName,
        price: productDetails.sellingPrice,
        quantity: product.quantity
      };
    }));

    const newOrder = new Order({
      userId: user._id,
      items: detailedProducts,
      totalPrice,
      address,
      contact
    });

    const savedOrder = await newOrder.save();

    // Prepare items details
    let itemsDetails = '';
    detailedProducts.forEach(product => {
      itemsDetails += `${product.name}: ${product.quantity} x ${product.price}\n`;
    });

    // Prepare address details
    const addressDetails = `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`;

    // Send email notification
    await sendEmail(user.email, 'Order Confirmation', 
      `Thank you for your order!\n\n` +
      `Items:\n${itemsDetails}\n` +
      `Total Price: ${totalPrice}\n\n` +
      `Delivery Address: ${addressDetails}\n\n` +
      `We appreciate your business!\n`
    );

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



const getCurrentUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // Use the user ID attached by the middleware

    const userOrders = await Order.find({ userId }).populate('items.productId');

    res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId'); // Fetch all orders from the database and populate product details
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: 'pending' }).populate('items.productId'); // Fetch all pending orders and populate product details
    res.status(200).json({ success: true, orders: pendingOrders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getDeliveredOrders = async (req, res) => {
  try {
    const deliveredOrders = await Order.find({ status: 'delivered' }).populate('items.productId');
    res.status(200).json({ success: true, orders: deliveredOrders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; // Destructure orderId and status from the request body

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getPendingOrders,
  getDeliveredOrders,
  updateOrderStatus,
  getCurrentUserOrders
};
