const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    pincode: String,
    address: String,
    city: String,
    phone: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Address", AddressSchema);
