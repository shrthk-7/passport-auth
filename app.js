require("dotenv").config();
const express = require("express");
const session = require("express-session");
const store = require("./database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res, next) => {
  if (req.session.viewCount) {
    req.session.viewCount++;
    res.send(`<h1>This is your ${req.session.viewCount}th visit!</h1>`);
  } else {
    req.session.viewCount = 1;
    res.send(`<h1>This is your first visit!</h1>`);
  }
});

app.listen(3000, () => {
  console.log("Listenening on localhost:3000");
});
