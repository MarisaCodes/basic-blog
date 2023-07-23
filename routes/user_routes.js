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
user_router.get("/login", auth_token, get_login);
user_router.post("/login", post_login);

module.exports = user_router;
