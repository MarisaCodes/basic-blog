const sql = require("../models/db");

// get signup page
const get_sign_up = (req, res) => {
  res.render("signup");
};

// post signup info

const post_sign_up = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};

module.exports = { get_sign_up, post_sign_up };
