const express = require("express");
const auth_token = require("../funcs/auth");
const { get_index } = require("../controllers/index");
const { profile_base64 } = require("../funcs/profile_base64");
const index_router = express.Router();

index_router.get("/", auth_token, profile_base64, get_index);

module.exports = index_router;
