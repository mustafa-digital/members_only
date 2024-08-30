const bcrypt = require("bcryptjs");

function validatePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function genPasswordHash(password) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  validatePassword,
  genPasswordHash,
};
