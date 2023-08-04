const express = require("express");
const profile_route = express.Router();
const auth_token = require("../funcs/auth");
const mime = require("mime-types");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sql = require("../models/db");
const upload = multer({ storage: multer.memoryStorage() });

profile_route.get("/profile", auth_token, (req, res, next) => {
  if (req.user.user_name === null) {
    res.redirect("/");
  }
  sql`select about from users where user_name = ${req.user.user_name}`.then(
    (rep) => {
      const about = rep.length ? rep[0].about : null;
      res.render("profile", {
        user: req.user,
        profile_pic: req.user.profile_pic,
        about,
      });
    }
  );
});
profile_route.post("/profile/about", auth_token, (req, res) => {
  const { about } = req.body;
  console.log(req.body);
  sql
    .begin(async (sql) => {
      return await sql`update users set about = ${about} where user_name = ${req.user.user_name}
    returning *
    `;
    })
    .then(() => {
      res.redirect("/profile");
    });
});
profile_route.post(
  "/profile/pfp",
  auth_token,
  upload.single("profile_pic"),
  (req, res) => {
    sql`select profile_pic from users where user_name = ${req.user.user_name}`
      .then((rep) => {
        const profile_pic = rep[0].profile_pic;
        profile_pic.includes("default")
          ? null
          : fs.rmSync(path.join("./static", profile_pic));
        fs.writeFileSync(
          path.join(
            "./static",
            `/user_imgs/${req.user.user_name}.${mime.extension(
              req.file.mimetype
            )}`
          ),
          req.file.buffer,
          { encoding: "base64" }
        );
        sql
          .begin(async (sql) => {
            return await sql`update users set profile_pic = ${path.join(
              "/user_imgs/",
              req.user.user_name + "." + mime.extension(req.file.mimetype)
            )}
              where user_name = ${req.user.user_name}
              `;
          })
          .then(() => {
            res.status(200).send("success");
          });
      })
      .catch((err) => console.log(err));
  }
);
module.exports = profile_route;
