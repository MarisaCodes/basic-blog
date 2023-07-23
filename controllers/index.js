const sql = require("../models/db");

// get index

const get_index = (req, res) => {
  sql`
   SELECT * FROM blogs
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
