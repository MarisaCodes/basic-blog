const { resize_pfp } = require("../funcs/profile_base64");
const sql = require("../models/db");

const get_profile = (req, res, next) => {
  if (req.user.user_name === null) {
    res.redirect("/");
  }
  sql`select about from users where user_name = ${req.user.user_name}`.then(
    (rep) => {
      const about = rep.length ? rep[0].about : null;

      res.render("profile", {
        user: req.user,
        about,
      });
    }
  );
};

const post_about = (req, res) => {
  const { about } = req.body;
  sql
    .begin(async (sql) => {
      return await sql`update users set about = ${about} where user_name = ${req.user.user_name}
      returning *
      `;
    })
    .then(() => {
      res.redirect("/profile");
    });
};

const post_pfp = (req, res) => {
  sql`select encode(pfp, 'base64') as pfp from users where user_name = ${req.user.user_name}`
    .then((rep) => {
      sql
        .begin(async (sql) => {
          const resized = await resize_pfp(req.file.buffer);
          const pfp = resized.toString("base64");
          return await sql`update users set pfp = decode(${pfp}, 'base64'),
          pfp_mime = ${req.file.mimetype}
              where user_name = ${req.user.user_name}
              `;
        })
        .then(() => {
          res.status(200).send("success");
        });
    })
    .catch((err) => console.log(err));
};

module.exports = { get_profile, post_about, post_pfp };
