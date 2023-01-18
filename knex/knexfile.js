require("dotenv").config();
const path = require("path");

const pathToMigration = path.resolve(__dirname, "../migrations");

module.exports = {
  client: "mysql",
  connection: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    ssl: true,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: pathToMigration,
  },
};
