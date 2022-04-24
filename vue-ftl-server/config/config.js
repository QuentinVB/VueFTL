require('dotenv').config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "../vue-ftl-database/database.sqlite3",
    logging:true
  },
  test: {
    dialect: "sqlite",
    storage: "../vue-ftl-database/database-test.sqlite3",
    logging:false
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host:process.env.MYSQL_HOST,
    dialect:"mysql",
    logging:false
  }
}
