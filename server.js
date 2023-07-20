const express = require("express");
const morgan = require("morgan");
const { router } = require("./routes/user_routes");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

// homepage
app.get("/", (req, res) => {
  res.render("index");
});

// user handling routes
app.use("/", router);

app.listen(process.env.PORT);
