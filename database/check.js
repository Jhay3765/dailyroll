const db = require("./init.js");

const users = db.prepare("SELECT * FROM users").all();
console.log("Current users in database:");
console.table(users);

const rolls = db.prepare("SELECT * FROM rolls").all();
console.table(rolls);
