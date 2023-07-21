const express = require("express");
const {
  get_sign_up,
  post_sign_up,
  post_login,
  get_login,
} = require("../controllers/users");
const router = express.Router();

// signup
router.get("/signup", get_sign_up);
router.post("/signup", post_sign_up);

// login
router.get("/login", get_login);
router.post("/login", post_login);

module.exports = { router };
