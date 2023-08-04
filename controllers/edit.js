const fs = require("fs");
const path = require("path");
const sql = require("../models/db");
const TurndownService = require("turndown");

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
// get edit page of specific
const get_edit = (req, res, next) => {
  if (req.user.user_name === null || !req.params.id) {
    next();
    return;
  }
  sql`select * from blogs where blogs.id = ${req.params.id} and blogs.author_id = 
  (select id from users where users.user_name = ${req.user.user_name})
  `.then((rep) => {
    if (!rep.length) {
      next();
      return;
    }
    fs.readFile(
      "./private/md_guide.md",
      (err, data) => {
        if (err) {
          res.render("edit", {
            user: req.user,
            blog: rep[0],
            md_guide: "### something broke",
          });
        } else {
          const td = new TurndownService();
          rep[0].content = td.turndown(rep[0].content);
          res.render("edit", {
            user: req.user,
            blog: rep[0],
            md_guide: data,
          });
        }
      }
    );
  });
};

// posting/submitting the edit
const post_edit = (req, res, next) => {
  if (req.user.user_name === null) {
    next();
    return;
  }
  let { title, content } = req.body;
  content = md.render(content);
  const id = req.params.id;
  sql
    .begin(async (sql) => {
      return await sql`update blogs set updated_at = now(),
          content = ${content},
          title = ${title}
          where blogs.id = ${id}
          returning *
          `;
    })
    .then((data) => {
      console.log(data);
      if (data.length) {
        res.status(200).json(JSON.stringify({ id }));
      } else {
        throw Error("could not update");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports = { get_edit, post_edit };
