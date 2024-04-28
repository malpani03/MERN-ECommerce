const express = require('express');
const{userSignInController}=require("../controller/userSignIn");
const router = express.Router();
const { userSignUpController } = require("../controller/userSignUp"); // Destructure userSignUpController from the import
const {userDetailsController}=require("../controller/userDetails")
const authToken=require("../middleware/authToken")

router.post("/signup", userSignUpController);
router.post('/signin',userSignInController);
router.get('/user-details',authToken,userDetailsController)

module.exports = router;
