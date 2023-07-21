const express = require("express");
const {
  get_sign_up,
  post_sign_up,
  post_login,
  get_login,
} = require("../controllers/users");
const user_router = express.Router();

// signup
user_router.get("/signup", get_sign_up);
user_router.post("/signup", post_sign_up);

// login
user_router.get("/login", get_login);
user_router.post("/login", post_login);

module.exports = user_router;
