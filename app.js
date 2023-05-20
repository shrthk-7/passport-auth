require("dotenv").config();
const express   = require("express");
const session   = require("express-session");
const passport  = require("passport");
const store     = require("./database");

const app = express();

// ----------- Express -------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------- Express Session -----
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ----------- Passport ------------
require("./passport");
app.use(passport.initialize());
app.use(passport.session());

// ----------- Router --------------
const router = require("./router");
app.use(router);

app.listen(3000, () => {
  console.log("Listenening on localhost:3000");
});
