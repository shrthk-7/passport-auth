const Controller = require("./controller");
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", Controller.homePage);
router.get("/login", Controller.sendLoginForm);
router.get("/register", Controller.sendRegisterForm);
router.get("/login-success", Controller.loginSuccess);
router.get("/login-fail", Controller.loginFailure);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-fail",
  })
);
router.post("/register", Controller.register);

module.exports = router;
