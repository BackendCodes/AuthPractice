const jwt = require("jsonwebtoken");
const jwtsecret = "lordsainathisgreat";

function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, jwtsecret);
      console.log("Decoded JWT:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login");
  }
}

module.exports = requireAuth;
