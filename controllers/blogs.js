const sql = require("../models/db");
const fs = require("fs");
const path = require("path");
const hljs = require("highlight.js");
const md = require("markdown-it")({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

// get create page
const get_create = (req, res) => {
  if (req.user.user_name === null) {
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
  let { title, content } = req.body;

  sql
    .begin(async (sql) => {
      return await sql`
    select id from users where user_name = ${username}
    `
        .then(async (rep) => {
          const author_id = rep[0].id;
          content = md.render(content);
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
const get_blog = (req, res, next) => {
  const { id } = req.params;
  sql`
  select * from (blogs join users on
  users.id = blogs.author_id)
  where blogs.id = ${id}
  
  `
    .then((data) => {
      if (data.length) {
        data[0].profile_pic = req.user.profile_pic;
        res.render("blog", { blog: data[0], user: req.user });
      } else {
        throw Error("not found");
      }
    })
    .catch((err) => {
      res.status(404);
      next();
    });
};

module.exports = {
  get_create,
  post_blog,
  get_blog,
};
