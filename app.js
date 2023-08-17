import bodyParser from "body-parser";
import express from "express";
const db = require('./db')
// import redis from "redis";

const app = express();
const port = 8000;

app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// const redisClient = redis.createClient({
//   host: "localhost",
//   port: 6379,
// });
