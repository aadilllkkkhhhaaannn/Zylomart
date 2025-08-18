const mongoose = require("mongoose");

const cookieSchema = new mongoose.Schema(
  {
    consent: {
      type: String,
      enum: ["all", "essential"],
      required: true,
    },

    userAgent: String,
    ip: String,
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("http-cookies", cookieSchema);
