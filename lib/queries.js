/**
 * -------------- QUERIES.js ----------------
 */
const Pool = require("../config/pool");

async function createAccount(email, hash, firstName, lastName) {
  try {
    const result = await Pool.query(
      "INSERT INTO Account (email, hash) VALUES ($1, $2) RETURNING id",
      [email, hash],
    );
    const newlyCreatedId = result.rows[0].id;
    await Pool.query(
      "INSERT INTO Profile (account_id, first_name, last_name) VALUES ($1, $2, $3)",
      [newlyCreatedId, firstName, lastName],
    );
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
  return;
}

module.exports = {
  createAccount,
};
