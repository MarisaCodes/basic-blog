const crypto = require("crypto");
const sql = require("../models/db");

// get signup page controller
const get_sign_up = (req, res) => {
  res.render("signup", { error: false });
  return;
};
// post signup info helper function

const is_user_unique = async (username) => {
  return sql`select user_name from public.users where user_name = ${username}`.then(
    (rep) => {
      if (!rep.length) {
        return true;
      }
      return false;
    }
  );
};
// post signup info controller
const post_sign_up = (req, res) => {
  const { username, pswd } = req.body;
  sql
    .begin(async (sql) => {
      const unique = await is_user_unique(username);
      if (unique) {
        const hash = crypto.createHash("sha256");
        const pswd_hash = hash.update(pswd).digest("hex");
        const user = [
          {
            user_name: username,
            password_hash: pswd_hash,
          },
        ];
        return await sql`
        insert into public.users ${sql(user)}
        returning *
        `;
      } else {
        throw Error("This username is taken");
      }
    })
    .then((rep) => {
      console.log(rep);
      const user = rep[0];
      res.locals.user = user.user_name;
      res.render("index");
      return;
    })
    .catch((err) => {
      res.render("signup", { error: err.message });
      return;
    });
};

//login controller get
const get_login = (req, res) => {
  res.render("login", { error: false });
  return;
};
// login controller post
const post_login = (req, res) => {
  const { username, pswd } = req.body;
  const hash = crypto.createHash("sha256");
  const pswd_hash = hash.update(pswd).digest("hex");
  sql`
  select user_name, password_hash from users where user_name = ${username}
  and password_hash = ${pswd_hash}
  `.then((rep) => {
    if (rep.length) {
      res.locals.user = rep[0].user_name;
      res.render("index");
      return;
    }
  });
};

module.exports = { get_sign_up, post_sign_up, post_login, get_login };
