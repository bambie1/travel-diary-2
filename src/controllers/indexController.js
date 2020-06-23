const User = require("../models/User");
const { getGooglePhoto } = require("../client/JS/getGooglePhoto");

exports.addTrip = async (req, res) => {
  var tripWithPhoto = req.body;
  try {
    tripWithPhoto.tripImg = await getGooglePhoto(req.body.tripLocation);
  } catch (error) {
    console.log("error: ", error);
  }

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
    var tripImg = await getGooglePhoto(req.body.tripLocation);
    console.log("google photo: ", tripImg);
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
          "trips.$.tripImg": tripImg,
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
