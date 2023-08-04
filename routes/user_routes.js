const express = require("express");
const cookieParser = require("cookie-parser");
const auth_token = require("../funcs/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  get_sign_up,
  post_sign_up,
  post_login,
  get_login,
  get_user_posts,
} = require("../controllers/users");
const user_router = express.Router();
// middleware
user_router.use(cookieParser());

// signup
user_router.get("/signup", auth_token, get_sign_up);
user_router.post("/signup", upload.single("profile_pic"), post_sign_up);

// login
user_router.get("/login", auth_token, get_login);
user_router.post("/login", post_login);
// get user blog
user_router.get("/user/blogs", auth_token, get_user_posts);
module.exports = user_router;
