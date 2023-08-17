import mysql from "mysql2";

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rey123@",
  database: "assigment-week9",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error Connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
