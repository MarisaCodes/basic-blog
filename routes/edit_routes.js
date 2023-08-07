const express = require("express");
const auth_token = require("../funcs/auth");
const { get_edit, post_edit } = require("../controllers/edit");
const { profile_base64 } = require("../funcs/profile_base64");
const edit_router = express.Router();

edit_router.get("/edit/:id", auth_token, profile_base64, get_edit);

edit_router.post("/edit/:id", auth_token, profile_base64, post_edit);
module.exports = edit_router;
