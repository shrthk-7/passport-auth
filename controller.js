const Models = require("./models");
const Utils = require("./utils");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  const { salt, hash } = Utils.generatePassword(password);
  const newUser = new Models.User({ username, salt, hash });
  await newUser.save();
  console.log(newUser);

  res.redirect("/login");
};

exports.sendLoginForm = async (req, res, next) => {
  const form = `
  <h1>Login Page</h1>
  <form action="/login" method="post">
    <label htmlFor="username">Username: </label>
    <input type="text" name="username" id="username" />
    <label htmlFor="password">Password: </label>
    <input type="password" name="password" id="password" />
    <button type="submit">Submit</button>
  </form>
  `;
  return res.send(form);
};

exports.sendRegisterForm = async (req, res, next) => {
  const form = `
  <h1>Login Page</h1>
  <form action="/register" method="post">
    <label htmlFor="username">Username: </label>
    <input type="text" name="username" id="username" />
    <label htmlFor="password">Password: </label>
    <input type="password" name="password" id="password" />
    <button type="submit">Submit</button>
  </form>
  `;
  return res.send(form);
};

exports.homePage = async (req, res, next) => {
  req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
  return res.send(
    `<h1>You have visited this page: ${req.session.visits} times</h1>`
  );
};

exports.loginSuccess = async (req, res, next) => {
  res.send(`<h1>Successfull Login</h1>`);
};

exports.loginFailure = async (req, res, next) => {
  res.send(`<h1>Failed Login</h1>`);
};
