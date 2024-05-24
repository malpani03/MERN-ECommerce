const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true
      });
    }

    res.json({
      data: product,
      message: "Ok",
      success: true,
      error: false
    });

  } catch (err) {
    res.status(500).json({
      message: err?.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = getProductDetails;
