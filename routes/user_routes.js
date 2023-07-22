const express = require("express");
const cookieParser = require("cookie-parser");
const auth_token = require("../funcs/auth");

const {
  get_sign_up,
  post_sign_up,
  post_login,
  get_login,
} = require("../controllers/users");
const user_router = express.Router();
// middleware
user_router.use(cookieParser());

// signup
user_router.get("/signup", auth_token, get_sign_up);
user_router.post("/signup", post_sign_up);

// login
user_router.get("/login", get_login);
user_router.post("/login", post_login);

// auth middleware function

// function auth_token(req, res, next) {
//   const cookie = req.cookies;
//   const token = cookie ? cookie.token : null;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
//       if (error) {
//         req.error = "Session expired";
//       } else {
//         req.user = decoded;
//       }
//     });
//   }
//   next();
// }

module.exports = user_router;
