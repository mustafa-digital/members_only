/**
 * -------------- POOL ----------------
 * This module creates a connection to the postgresql database and exports it so other modules can interact and query the database
 */

const { Pool } = require("pg");
require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */

// Expose the connection
module.exports = new Pool({
  connectionString: process.env.DB_STRING,
});
