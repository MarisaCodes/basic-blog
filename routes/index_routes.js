const express = require("express");
const auth_token = require("../funcs/auth");
const { get_index } = require("../controllers/index");
const index_router = express.Router();

index_router.get("/", auth_token, get_index);

module.exports = index_router;
