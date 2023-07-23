const sql = require("../models/db");

// get index

const get_index = (req, res) => {
  sql`
   SELECT blogs.id as blog_id, blogs.created_at, blogs.title, blogs.content,
   blogs.updated_at, users.user_name, blogs.slug,users.profile_pic
   FROM (blogs
   JOIN users ON blogs.author_id = users.id)
   ORDER BY created_at DESC
   `
    .then((data) => {
      console.log(data);
      res.render("index", { user: req.user, data });
    })
    .catch((err) => {
      res.render("index", { user: req.user, data: `${err.message}` });
    });
};

module.exports = { get_index };

// id,
// author_id,
// created_at,
// updated_at,
// title,
// content,
// slug,
// user_name,
// password_hash,
// about,
// profile_pic
