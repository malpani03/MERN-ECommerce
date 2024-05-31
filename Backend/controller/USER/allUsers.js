const userModel = require("../../models/usermodel");

async function allUsers(req, res) {
  try {
    console.log("userId", req.userId);

    // Fetch all users except those with role 'ADMIN'
    const allUsers = await userModel.find({ role: { $ne: 'ADMIN' } });

    res.json({
      message: "All users",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
