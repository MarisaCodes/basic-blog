const crypto = require("crypto");
const sql = require("../models/db");

// get signup page
const get_sign_up = (req, res) => {
  res.render("signup");
};

// post signup info
const is_user_unique = (username) => {
  sql`select user_name from public.users where user_name = ${username}`
  .then()
};
const post_sign_up = (req, res) => {
  const { username, pswd } = req.body;
  const hash = crypto.createHash("sha256");
  const pswd_hash = hash.update(pswd).digest("hex");
  sql`insert into public.users (user_name, password_hash) values (${username}, ${pswd_hash})`
    .then((rep) => {
      res.json(rep);
    })
    .catch(console.log);
};

module.exports = { get_sign_up, post_sign_up };
