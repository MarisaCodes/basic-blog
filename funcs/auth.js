const jwt = require("jsonwebtoken");
const sql = require("../models/db");
require("dotenv").config();
// middleware to run in a get request to authenticate
function auth_token(req, res, next) {
  const cookie = req.cookies;
  const token = cookie ? cookie?.token : null;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        const refresh_token = cookie?.refresh_token;
        jwt.verify(
          refresh_token,
          process.env.TOKEN_SECRET,
          (error, decoded) => {
            if (error) {
              res.clearCookie("token");
              res.clearCookie("refresh_token");
              req.user = {
                user_name: null,
                profile_pic: null,
              };
              next();
            } else {
              const username = decoded.user_name;
              const token = jwt.sign(
                { user_name: username },
                process.env.TOKEN_SECRET,
                { expiresIn: `${process.env.access_expire}` }
              );
              res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
              });
              sql`select encode(pfp, 'base64') as pfp, pfp_mime from users where user_name = ${username}`.then(
                (rep) => {
                  req.user = {
                    user_name: decoded.user_name,
                    pfp: rep[0].pfp,
                    pfp_mime: rep[0].pfp_mime,
                  };
                  next();
                }
              );
            }
          }
        );
      } else {
        sql`select encode(pfp, 'base64') as pfp, pfp_mime from users where user_name = ${decoded.user_name}`.then(
          (rep) => {
            req.user = {
              user_name: decoded.user_name,
              pfp: rep[0].pfp,
              pfp_mime: rep[0].pfp_mime,
            };
            next();
          }
        );
      }
    });
  } else {
    req.user = {
      user_name: null,
      profile_pic: null,
    };
    next();
  }
}
module.exports = auth_token;
