const mongoose = require("mongoose");

var tripSchema = new mongoose.Schema({
  tripLocation: {
    type: String,
    required: true,
  },
  tripDate: {
    type: Date,
    required: true,
  },
  tripImg: String,
  tripNotes: String,
});

var Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
