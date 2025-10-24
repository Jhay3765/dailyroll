const Database = require("better-sqlite3");

// Open (or create) your database file
const db = new Database("./database/data.db");

// Create a table if it doesn’t exist yet
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,        -- Discord user ID
    username TEXT,
    totalScore INTEGER DEFAULT 0,
    lastRollDate TEXT
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS rolls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    rollValue INTEGER,
    rollDate TEXT
  )
`
).run();

console.log("✅ Database initialized.");

module.exports = db;
