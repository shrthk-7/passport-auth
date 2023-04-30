require("dotenv").config();
const express = require("express");
const session = require("express-session");
const store = require("./database");
const Controllers = require("./controller");

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
  req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
  res.send(`<h1>You have visited this page: ${req.session.visits} times</h1>`);
});

app.post("/", Controllers.User.createUser);

app.listen(3000, () => {
  console.log("Listenening on localhost:3000");
});
