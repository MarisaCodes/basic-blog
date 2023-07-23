const { get_create, post_blog, get_blog } = require("../controllers/blogs");
const auth_token = require("../funcs/auth");
const express = require("express");
const blogs_router = express.Router();

// get create blogs page:
blogs_router.get("/create", auth_token, get_create);
// post a blog from create page:
blogs_router.post("/create", auth_token, post_blog);
// get single blog
blogs_router.get("/blog/:id", auth_token, get_blog)
module.exports = blogs_router;
