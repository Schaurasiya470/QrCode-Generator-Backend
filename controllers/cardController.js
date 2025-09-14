const mongoose = require("mongoose");
const BusinessModel = require('../models/businessModel');

exports.fetchUserDetails = async (req, res) => {
    try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const user = await BusinessModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log("user details",user)
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}