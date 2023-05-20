exports.verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/login");
};

exports.verifyAdmin = (req, res, next) => {
  if (req.isAdmin) return next();
  return res.send(`<h1>u no admin ok</h1>`);
};
