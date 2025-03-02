const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  price: Number,
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
