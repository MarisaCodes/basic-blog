const sql = require("../models/db");

// get create page
const get_create = (req, res) => {
  res.render("create");
};



module.exports = {
    get_create
}
