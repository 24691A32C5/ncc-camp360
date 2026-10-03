const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Create a new user
async function createUser(name, email, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, hashedPassword, role]
  );

  return result.rows[0];
}

// Find a user by email (used for login)
async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail
};