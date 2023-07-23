const { get_create } = require("../controllers/blogs");
const auth_token = require("../funcs/auth");
const express = require("express");
const blogs_router = express.Router();

// get create blogs page:
blogs_router.get("/create", auth_token, get_create);

module.exports = blogs_router;
