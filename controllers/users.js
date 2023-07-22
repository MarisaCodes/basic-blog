const crypto = require("crypto");
const sql = require("../models/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// get signup page controller
const get_sign_up = (req, res) => {
  res.render("signup", { error: null, user: req.user });
};

const gen_auth_token = (user_name) => {
  return jwt.sign({ user_name }, process.env.TOKEN_SECRET, { expiresIn: 60 });
};
const is_username_unique = (user_name) => {
  // This function generates an auth token only given
  // UNIQUE username of users signing up
  return new Promise((resolve, reject) => {
    sql`
    SELECT user_name FROM users WHERE user_name = ${user_name}
    `
      .then((rep) => {
        if (!rep.length) {
          resolve(user_name);
        } else {
          reject("This username is already taken!");
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
// post signup info controller
const post_sign_up = (req, res) => {
  const { username, pswd } = req.body;
  is_username_unique(username)
    .then((user_name) => {
      sql
        .begin(async (sql) => {
          const hash = crypto.createHash("sha256");
          const password_hash = hash.update(pswd).digest("hex");
          const user = [
            {
              user_name,
              password_hash,
            },
          ];
          return await sql`
        INSERT into users ${sql(user)}
        RETURNING *
        `;
        })
        .then((rep) => {
          const token = gen_auth_token(rep[0].user_name);
          res.cookie("token", token, { httpOnly: true });
          res.render("index", {
            error: null,
            user: { user_name: rep[0].user_name },
          });
        })
        .catch(() => {
          res.render("signup", {
            error: "Could not make transaction",
            user: null,
          });
        });
    })
    .catch((err) => {
      res.render("signup", { error: err, user: null });
    });
};
//login controller get
const get_login = (req, res) => {
  res.render("login", { error: false, user: req.user });
  return;
};
// login controller post
const post_login = (req, res) => {
  const { username, pswd } = req.body;
  const hash = crypto.createHash("sha256");
  const pswd_hash = hash.update(pswd).digest("hex");
  sql`
  select user_name, password_hash, id from users where user_name = ${username}
  and password_hash = ${pswd_hash}
  `
    .then((rep) => {
      if (rep.length) {
        const token = gen_auth_token(rep[0].user_name);
        res.cookie("token", token);
        res.render("index");
        return;
      } else {
        res.render("login", { error: "😔 wrong username or password..." });
        return;
      }
    })
    .catch((err) => {
      res.render("login", { error: err.message });
    });
};

module.exports = {
  get_sign_up,
  post_sign_up,
  post_login,
  get_login,
};
