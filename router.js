const Controller  = require("./controller");
const Middleware  = require("./middleware");
const express     = require("express");
const passport    = require("passport");

const router = express.Router();

router.get("/",           Controller.homePage);
router.get("/login",      Controller.sendLoginForm);
router.get("/register",   Controller.sendRegisterForm);
router.get("/login-fail", Controller.loginFailure);

router.get("/logout",         Middleware.Auth.verifyAuth, Controller.logout);
router.get("/login-success",  Middleware.Auth.verifyAuth, Controller.loginSuccess);
router.get("/protected-route",Middleware.Auth.verifyAuth, Controller.protectedRoute);

router.post("/register", Controller.register);
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-fail",
  })
);

module.exports = router;
