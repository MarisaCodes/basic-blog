const sql = require("../models/db");
const fs = require("fs");
const path = require("path");

// get create page
const get_create = (req, res) => {
  if (req.user === null) {
    res.redirect("/");
    return;
  }
  fs.readFile(
    path.resolve(process.cwd(), "private/md_guide.md"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render("create", { md_guide: data, user: req.user, error: null });
      return;
    }
  );
};
// POST a blog from create page
const post_blog = (req, res) => {
  if (req.user === null) {
    res.redirect("/");
  }
  const username = req.user.user_name;
  const { title, content } = req.body;

  sql
    .begin(async (sql) => {
      return await sql`
    select id from users where user_name = ${username}
    `
        .then(async (rep) => {
          const author_id = rep[0].id;
          const blog = [
            {
              author_id,
              title,
              content,
              slug: title.split(" ").join("-"),
            },
          ];
          return await sql`
      INSERT into blogs
      ${sql(blog)}
      returning *
      `;
        })
        .catch((err) => {
          console.log(err, err.message);
          res.status(501).send(err.message);
        });
    })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.json(err);
      res.status(501).send(err.message);
    });
};
const get_blog = (req, res) => {
  const { id } = req.params;
  sql`
  select * from (blogs join users on
  users.id = blogs.author_id)
  where blogs.id = ${id}
  
  `.then((data) => {
    console.log(data[0]);
    res.render("blog", { blog: data[0], user: req.user });
  });
};
module.exports = {
  get_create,
  post_blog,
  get_blog,
};
