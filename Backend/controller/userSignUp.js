const userModel = require("../models/usermodel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      // Changed error message to be more specific
      throw new Error("User already exists with this email");
    }

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!name) {
      throw new Error("Please provide name");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong while hashing the password");
    }

    const payload = {
      ...req.body,
      role:'GENERAL',
      password: hashPassword
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      message: "User Created Successfully",
      error: false,
      success: true
    });

  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = {
  userSignUpController
};
