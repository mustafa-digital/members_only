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

async function createMessage(accountId, title, message) {
  try {
    await Pool.query(
      "INSERT INTO Post (account_id, title, message) VALUES ($1, $2, $3)",
      [accountId, title, message],
    );
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}

async function getAllMessages() {
  try {
    const result = await Pool.query(
      "SELECT Post.id, email, title, message, posted_at FROM Post JOIN Account ON Account.id = Post.account_id ORDER BY posted_at DESC",
    );
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createAccount,
  createMessage,
  getAllMessages,
};
