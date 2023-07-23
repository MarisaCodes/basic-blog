const sql = require("../models/db");
const fs = require("fs");
const path = require("path");
// get create page
const get_create = (req, res) => {
  fs.readFile(
    path.resolve(process.cwd(), "private/md_guide.md"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render("create", { md_guide: data, user: req.user });
      return;
    }
  );
};

module.exports = {
  get_create,
};
