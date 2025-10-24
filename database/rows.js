const db = require("./init.js");

const userId = "534597278338646016";
const rows = db
  .prepare("SELECT rollValue FROM rolls WHERE userId = ?")
  .all(userId);

console.log(rows);
