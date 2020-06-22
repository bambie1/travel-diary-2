const User = require("../models/User");

exports.addTrip = async (req, res) => {
  var tripWithPhoto = req.body;
  tripWithPhoto.tripImg =
    "https://maps.google.com/maps/contrib/108966430479377047383";
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { trips: tripWithPhoto } },
    { new: true, upsert: true }
  )
    .then((update) => res.redirect("/trips"))
    .catch((err) => console.log("error: ", err));
};

exports.getAllTrips = (req, res) => {
  res.render("trips", { name: req.user.name, trips: req.user.trips });
};

exports.updateTrip = async (req, res) => {
  try {
    var doc = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "trips._id": req.params.tripId,
      },
      {
        $set: {
          "trips.$.tripLocation": req.body.tripLocation,
          "trips.$.tripDate": req.body.tripDate,
          "trips.$.tripNotes": req.body.tripNotes,
        },
      }
    );
    res.redirect("/trips");
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    var doc = await User.updateOne(
      {
        _id: req.user._id,
        "trips._id": req.params.tripId,
      },
      { $pull: { trips: { _id: req.params.tripId } } }
    );
  } catch (error) {
    console.log("error: ", error);
  }

  res.redirect("/trips");
};
