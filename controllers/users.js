const crypto = require("crypto");
const sql = require("../models/db");
const gen_auth_token = require("../funcs/gen_auth_token");
require("dotenv").config();

// get signup page controller
const get_sign_up = (req, res) => {
  if (req.user === null) {
    res.render("signup", { error: null, user: req.user });
  } else {
    res.redirect("/");
  }
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
          const token = gen_auth_token(rep[0].user_name, "access");
          const refresh_token = gen_auth_token(rep[0].user_name, "refresh");
          res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
          res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite: "strict",
          });
          res.status(200).send("success");
        })
        .catch(() => {
          res.status(500).json(
            JSON.stringify({
              error: "Could not make transaction",
              user: null,
            })
          );
        });
    })
    .catch((err) => {
      res.status(406).json(JSON.stringify({ error: err, user: null }));
    });
};
//login controller get
const get_login = (req, res) => {
  if (req.user === null) {
    res.render("login", { error: null, user: req.user });
  } else {
    res.redirect("/");
  }
};
// login controller post
const post_login = (req, res) => {
  const { username, pswd } = req.body;
  const hash = crypto.createHash("sha256");
  const pswd_hash = hash.update(pswd).digest("hex");
  sql`
  select user_name, password_hash from users where user_name = ${username}
  and password_hash = ${pswd_hash}
  `
    .then((rep) => {
      if (rep.length) {
        const token = gen_auth_token(rep[0].user_name, "access");
        const refresh_token = gen_auth_token(rep[0].user_name, "refresh");
        res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          sameSite: "strict",
        });
        res.status(200).send("success");
      } else {
        throw new Error("😔 wrong username or password...");
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json(JSON.stringify({ error: err.message, user: req.user }));
    });
};

// get user blog posts

const get_user_posts = (req, res, next) => {
  if (req.user === null) {
    res.status(403).render("403", { title: "403", user: req.user });
  }
  sql`select * from blogs where blogs.author_id = (select id from users where users.user_name = ${req.user.user_name})`
    .then((data) => {
      res.render("your_posts", {
        title: "Your posts",
        user: req.user,
        data,
        edit: true,
      });
    })
    .catch((err) => {
      res.render("your_posts", {
        title: "Your posts",
        user: req.user,
        data: null,
        error: err.message,
        edit: null
      });
    });
};

module.exports = {
  get_sign_up,
  post_sign_up,
  post_login,
  get_login,
  get_user_posts,
};
