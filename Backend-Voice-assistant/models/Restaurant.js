const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, 
  },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
});

restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
