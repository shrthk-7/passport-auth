const { User } = require("./models");

const createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const newUser = await User.create({
    username: username,
    hash: password,
    salt: "salt",
  });

  return res.status(200).json({
    user: newUser,
  });
};

module.exports = {
  User: {
    createUser,
  },
};
