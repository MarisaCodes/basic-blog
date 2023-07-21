const { get_create } = require("../controllers/blogs");
const express = require("express");
const blogs_router = express.Router();

// get create blogs page:
blogs_router.get("/create", get_create);

module.exports = blogs_router;
