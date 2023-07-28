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
      res.render("index", { user: req.user, data, error: null });
    })
    .catch((err) => {
      console.log("error triggered", err.message);
      res.render("index", { user: req.user, data: null, error: err.message });
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
