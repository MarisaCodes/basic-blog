const postgres = require("postgres");
require("dotenv").config();

const url_data = {
  username: process.env.USERNAME,
  pswd: process.env.PSWD,
  db_name: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const sql = postgres(
  `postgres://${url_data.username}:${url_data.pswd}@localhost:${url_data.port}/${url_data.db_name}`
);

// sql`
// select * from (blogs join users on blogs.author_id = 
//   (select id from users where users.user_name = ${'reimu'}))
//   where slug = ${'I-love-raiko\'s-theme'} AND user_name = 'reimu'
// `.then(console.log)
module.exports = sql;
