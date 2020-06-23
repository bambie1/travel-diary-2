const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/auth");
const indexController = require("../controllers/indexController");
const { check, body, validationResult } = require("express-validator");
const formatDate = require("../client/JS/formatDate");

router.get("/", (req, res) => {
  res.render("errorHtml");
});

module.exports = router;
