const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/auth");
const indexController = require("../controllers/indexController");
const { check, body, validationResult } = require("express-validator");
const formatDate = require("../client/JS/formatDate");

router.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
router.get("/addTrip", ensureAuth, (req, res) => {
  res.render("addUpdateTrip", { route: "/addTrip", method: "POST" });
});
router.get("/trips", ensureAuth, indexController.getAllTrips);

router.get("/trips/:tripId", (req, res) => {
  var selectedTrip = req.user.trips.find(
    (trip) => trip._id == req.params.tripId
  );
  var formatTrip = {
    tripId: selectedTrip._id,
    tripLocation: selectedTrip.tripLocation,
    tripDate: formatDate(selectedTrip.tripDate),
    tripNotes: selectedTrip.tripNotes,
  };
  res.render("addUpdateTrip", {
    trip: formatTrip,
    route: `/trips/${req.params.tripId}`,
    method: "POST",
  });
});
router.post("/trips/:tripId", ensureAuth, indexController.updateTrip);

router.post("/addTrip", ensureAuth, indexController.addTrip);

router.get("/trips/delete/:tripId", ensureAuth, indexController.deleteTrip);

module.exports = router;
