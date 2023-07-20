const express = require("express");
const { get_sign_up, post_sign_up } = require("../controllers/users");
const router = express.Router();

router.get("/signup", get_sign_up);
router.post("/signup", post_sign_up);

module.exports = { router };
