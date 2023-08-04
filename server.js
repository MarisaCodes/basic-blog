const express = require("express");
const morgan = require("morgan");
const path = require("path");
const user_router = require("./routes/user_routes");
const blogs_router = require("./routes/blog_routes");
const cookieParser = require("cookie-parser");
const index_router = require("./routes/index_routes");
const edit_router = require("./routes/edit_routes");
const auth_token = require("./funcs/auth");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

// middleware

app.use(morgan("dev")); // for dev only
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cookieParser());

// homepage
app.use("/", index_router);
// logout redirect
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refresh_token");
  res.redirect("/");
});
// handling auth routes
app.use("/", user_router);
// handling blog logic routes (crud routes)
app.use("/", blogs_router);
// handling edit routes
app.use("/", edit_router);
// 404
app.use(auth_token, (req, res) => {
  res.status(404).render("404", { title: 404, user: req.user });
});

app.listen(process.env.PORT);
