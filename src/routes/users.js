const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const User = require("../models/User");
const usersController = require("../controllers/usersController");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid e-mail format")
      .normalizeEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "E-mail is already registered with an account"
            );
          }
        });
      }),
    body("name")
      .matches(/[a-zA-Z]/)
      .withMessage("Please enter a name"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  usersController.registerUser
);

router.post("/login", usersController.loginUser);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
