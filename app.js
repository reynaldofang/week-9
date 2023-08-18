const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/apiRoutes");
const redis = require("ioredis");

const app = express();
const port = 8000;

const redisClient = new redis();

app.use(bodyParser.json());

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

app.use("/", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
