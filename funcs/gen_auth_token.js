const jwt = require("jsonwebtoken");
require("dotenv").config();

const gen_auth_token = (user_name, expires_in) => {
  let time;
  if (expires_in === "access") {
    time = process.env.access_expire;
  } else if (expires_in === "refresh") {
    time = process.env.refresh_expire;
  }
  return jwt.sign({ user_name }, process.env.TOKEN_SECRET, {
    expiresIn: `${time}`,
  });
};

module.exports = gen_auth_token;
