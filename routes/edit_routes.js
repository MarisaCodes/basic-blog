const express = require("express");
const auth_token = require("../funcs/auth");
const { get_edit, post_edit } = require("../controllers/edit");
const edit_router = express.Router();

edit_router.get("/edit/:id", auth_token, get_edit);

edit_router.post("/edit/:id", auth_token, post_edit);
module.exports = edit_router;
