const jwt = require("jsonwebtoken");
require("dotenv").config();
// middleware to run in a get request to authenticate
function auth_token(req, res, next) {
  const cookie = req.cookies;
  const token = cookie ? cookie?.token : null;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        const refresh_token = cookie?.refresh_token;
        jwt.verify(
          refresh_token,
          process.env.TOKEN_SECRET,
          (error, decoded) => {
            if (error) {
              res.clearCookie("token");
              res.clearCookie("refresh_token");
              req.user = null;
            } else {
              const username = decoded.user_name;
              const token = jwt.sign(
                { user_name: username },
                process.env.TOKEN_SECRET,
                { expiresIn: `${process.env.access_expire}` }
              );
              res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
              });
              req.user = decoded;
            }
          }
        );
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
