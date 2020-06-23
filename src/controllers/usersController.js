const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  const { name, email, password, password2 } = req.body;
  if (!errors.isEmpty()) {
    errorsBody = handleValidation(errors);
    res.render("register", { errorsBody, name, email, password, password2 });
    return res.status(422);
    // .json({ errors: errors.array() });
  }
  const newUser = new User({
    name,
    email,
    password,
  });
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => res.redirect("/users/login"))
        .catch((err) => console.log(err));
    })
  );
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.render("login", {
        emailErr: info.emailInfo,
        pwErr: info.pwInfo,
        email,
        password,
      });
    }
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.redirect("/trips");
    });
  })(req, res, next);
};

const handleValidation = (err) => {
  var body = {};
  err.errors.forEach((errObj) => (body[errObj.param] = errObj.msg));
  return body;
};
