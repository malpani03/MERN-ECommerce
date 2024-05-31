// controllers/USER/clearCartController.js
const Cart = require('../../models/cartProduct');

const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { itemsToClear } = req.body; 

    // Clear specific items if provided, else clear all items
    if (itemsToClear && itemsToClear.length > 0) {
      await Cart.deleteMany({ userId, productId: { $in: itemsToClear } });
    } else {
      await Cart.deleteMany({ userId });
    }

    res.status(200).json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  clearCart,
};
