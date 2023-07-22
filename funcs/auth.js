const jwt = require("jsonwebtoken");

function auth_token(req, res, next) {
  const cookie = req.cookies;
  const token = cookie ? cookie.token : null;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.clearCookie("token")
        req.user = null;
      } else {
        req.user = decoded;
      }
    });
  } else {
    req.user = null;
  }
  next();
}
module.exports = auth_token;
