const express = require("express");
const morgan = require("morgan");
const { router } = require("./routes/user_routes");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));
app.use(express.static("static"));
// homepage
app.get("/", (req, res) => {
  res.locals.user = null;
  res.render("index");
  return
});

// user handling routes
app.use("/", router);

app.listen(process.env.PORT);
