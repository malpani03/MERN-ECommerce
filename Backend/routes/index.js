const express = require('express');
const router = express.Router();
const { userSignInController } = require("../controller/USER/userSignIn");
const { userSignUpController } = require("../controller/USER/userSignUp");
const { userDetailsController } = require("../controller/USER/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require('../controller/USER/userLogout');
const allUsers = require('../controller/USER/allUsers');
const updateUser = require('../controller/USER/updateUser');
const uploadProductController = require('../controller/PRODUCT/uploadProduct');
const getProductController = require('../controller/PRODUCT/getProduct');
const updateProductController = require('../controller/PRODUCT/updateProduct');
const getCategoryProduct = require('../controller/PRODUCT/getCategoryProductOne');
const getCategorywiseProduct = require('../controller/PRODUCT/getCategorywiseProduct');
const getProductDetails = require('../controller/PRODUCT/getProductDetails');
const addToCartController = require('../controller/USER/addToCartController');
const countAddToCartProduct = require('../controller/USER/countAddToCartProduct');
const addToCartViewProduct = require('../controller/USER/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/USER/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/USER/deleteAddToCartProduct');
const searchProduct = require('../controller/PRODUCT/SearchProduct');
const filterProductController = require('../controller/PRODUCT/filterProduct');
const orderController = require('../controller/USER/orderController');
const { createPaymentIntent, confirmPayment } = require('../controller/USER/paymentController');
const { clearCart } = require('../controller/USER/clearCartController');
const deleteAllCartProducts = require('../controller/USER/deleteAllCartProducts');


router.post("/signup", userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogout);

// ADMIN PANEL
router.get('/all-user', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

// PRODUCT
router.post('/upload-product', authToken, uploadProductController);
router.get('/get-product', getProductController);
router.post("/update-product", authToken, updateProductController);
router.get('/get-categoryProduct', getCategoryProduct);
router.post('/category-product', getCategorywiseProduct);
router.post('/product-details', getProductDetails);
router.get('/search', searchProduct);
router.post('/filter-product', filterProductController);

// USER ADD TO CART
router.post('/addtocart', authToken, addToCartController);
router.get('/countAddToCartProduct', authToken, countAddToCartProduct);
router.get('/view-cart-product', authToken, addToCartViewProduct);
router.post('/update-cart-product', authToken, updateAddToCartProduct);
router.post('/delete-cart-product', authToken, deleteAddToCartProduct);
router.delete('/cart/clear', authToken, clearCart); // Correct usage
router.delete('/delete-all-cart-products', authToken, deleteAllCartProducts);

// ORDERS
router.post('/orders', authToken, orderController.createOrder);
router.get('/allorders', orderController.getAllOrders);
router.get('/pendingorders',authToken, orderController.getPendingOrders);
router.put('/orders/updateStatus',orderController.updateOrderStatus);
router.get('/deliveredorders', orderController.getDeliveredOrders);
router.get('/userOrders', authToken, orderController.getCurrentUserOrders);

router.post('/payment/create-payment-intent', createPaymentIntent);
router.post('/confirm-payment', confirmPayment);

module.exports = router;
