const mongoose = require("mongoose");
Trip = require("./Trip.js");
TripSchema = mongoose.model("Trip").schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    trips: [TripSchema],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
