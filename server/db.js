require("dotenv").config();
const pg = require("pg");

const connectionString = process.env.DB_URL;

const pool = new pg.Pool({ connectionString });

module.exports = pool;
