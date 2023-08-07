const express = require("express");
const profile_route = express.Router();
const auth_token = require("../funcs/auth");
const multer = require("multer");
const { profile_base64 } = require("../funcs/profile_base64");
const { get_profile, post_about, post_pfp } = require("../controllers/profile");
const upload = multer({ storage: multer.memoryStorage() });
require("dotenv").config();

profile_route.get("/profile", auth_token, profile_base64, get_profile);

profile_route.post("/profile/about", auth_token, post_about);

profile_route.post(
  "/profile/pfp",
  auth_token,
  upload.single("profile_pic"),
  post_pfp
);
module.exports = profile_route;
