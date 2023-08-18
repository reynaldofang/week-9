const db = require("../model/db");
const redis = require("ioredis");

exports.getAllUser = (req, res) => {
  const userId = req.params.id;

  const redisKey = `user:${userId}`;
  const redisClient = new redis();

  redisClient.get(redisKey, (redisErr, cachedData) => {
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      res.json(parsedData);
      console.log("get data from cache");
    } else {
      const sql =
        "SELECT users.id, name, address, " +
        'SUM(CASE WHEN type="income" THEN amount ELSE 0 END) AS total_income, ' +
        'SUM(CASE WHEN type="expense" THEN amount ELSE 0 END) AS total_expense ' +
        "FROM users " +
        "LEFT JOIN transactions ON users.id = transactions.user_id " +
        "WHERE users.id = ? " +
        "GROUP BY users.id";
      db.query(sql, [userId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "An error occurred while fetching user information",
          });
        } else {
          const userData = {
            id: result[0].id,
            name: result[0].name,
            address: result[0].address,
            balance: result[0].total_income - result[0].total_expense,
            expense: result[0].total_expense,
          };

          // Set data in Redis cache
          redisClient.setex(redisKey, 120, JSON.stringify(userData)); // Cache for 2 minutes
          res.json(userData);
          console.log("add new data to cache");
        }
      });
    }
  });
};
