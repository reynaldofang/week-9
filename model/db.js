const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "containers-us-west-135.railway.app",
  port: "6628",
  user: "root",
  password: "O65AaKcnY0qXPv0UIObr",
  database: "railway",
});

db.connect((err) => {
  if (err) {
    console.log("Error Connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
