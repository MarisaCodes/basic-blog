const express = require("express");
const morgan = require("morgan");
const user_router = require("./routes/user_routes");
const blogs_router = require("./routes/blog_routes");
const cookieParser = require("cookie-parser");
const auth_token = require("./funcs/auth");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));
app.use(express.static("static"));
app.use(cookieParser());

// homepage
app.get("/", auth_token, (req, res) => {
  res.render("index", { user: req.user });
  return;
});

// handling auth routes
app.use("/", user_router);
// handling blog logic routes (crud routes)
app.use("/", blogs_router);

app.listen(process.env.PORT);

