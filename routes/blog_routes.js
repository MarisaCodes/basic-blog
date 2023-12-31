const { get_create, post_blog, get_blog } = require("../controllers/blogs");
const auth_token = require("../funcs/auth");
const express = require("express");
const { profile_base64 } = require("../funcs/profile_base64");
const blogs_router = express.Router();

// get create blogs page:
blogs_router.get("/create", auth_token, profile_base64, get_create);
// post a blog from create page:
blogs_router.post("/create", auth_token, profile_base64, post_blog);
// get single blog
blogs_router.get("/blog/:id", auth_token, profile_base64, get_blog);
module.exports = blogs_router;
