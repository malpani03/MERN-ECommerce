// controllers/cartController.js
const addToCartModel = require("../../models/cartProduct");

const deleteAllCartProducts = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const deleteProducts = await addToCartModel.deleteMany({ userId: currentUserId });

    res.json({
      message: "All products deleted from cart",
      error: false,
      success: true,
      data: deleteProducts,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAllCartProducts;
