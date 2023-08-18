const db = require("../model/db");

exports.getAllTransactions = (req, res) => {
  const sql = "SELECT * FROM transactions";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching transactions" });
    } else {
      res.json(result);
    }
  });
};

exports.createTransactions = (req, res) => {
  const { user_id, type, amount } = req.body;
  const sql =
    "INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)";
  db.query(sql, [user_id, type, amount], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the transaction" });
    } else {
      // transaction added
      const insertedTransactionId = result.insertId;

      // Delete cache associated with user_id from Redis
      const redisClient = new redis();
      const redisKey = `user:${user_id}`;
      redisClient.del(redisKey, (delErr, deletedCount) => {
        if (delErr) {
          console.error(delErr);
        } else {
          console.log(`Deleted cache for user_id: ${user_id}`);
        }
        redisClient.quit(); // Tutup koneksi Redis
      });

      res.json({
        message: "Transaction added successfully",
        id: insertedTransactionId,
      });
    }
  });
};

exports.updateTransaction = (req, res) => {
  const transactionId = req.params.id;
  const { type, amount } = req.body;
  let userId; // Declare userId variable

  // To Get trasaction data relate with userID
  const fetchTransactionSQL = "SELECT user_id FROM transactions WHERE id = ?";
  db.query(fetchTransactionSQL, [transactionId], (fetchErr, fetchResult) => {
    if (fetchErr || fetchResult.length === 0) {
      console.error(fetchErr || "Transaction not found");
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    userId = fetchResult[0].user_id; // Get the userId from the fetched transaction

    // Update the transaction data
    const updateTransactionSQL =
      "UPDATE transactions SET type = ?, amount = ? WHERE id = ?";
    db.query(
      updateTransactionSQL,
      [type, amount, transactionId],
      (updateErr) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).json({
            error: "An error occurred while updating the transaction",
          });
        } else {
          res.json({ message: "Transaction updated successfully" });

          // Now, delete the cache related to the userId
          const redisClient = new redis();
          const redisKey = `user:${userId}`;
          redisClient.del(redisKey, (delErr, deletedCount) => {
            if (delErr) {
              console.error(delErr);
            } else {
              console.log(`Deleted cache for userId: ${userId}`);
            }
            redisClient.quit(); // Close the Redis connection
          });
        }
      }
    );
  });
};

exports.deleteTransaction = (req, res) => {
  const transactionId = req.params.id;
  let userId; // Declare userId variable

  // To Get trasaction data relate with userID
  const fetchTransactionSQL = "SELECT user_id FROM transactions WHERE id = ?";
  db.query(fetchTransactionSQL, [transactionId], (fetchErr, fetchResult) => {
    if (fetchErr || fetchResult.length === 0) {
      console.error(fetchErr || "Transaction not found");
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    userId = fetchResult[0].user_id; // Get the userId from the fetched transaction

    // Delete the transaction
    const deleteTransactionSQL = "DELETE FROM transactions WHERE id = ?";
    db.query(deleteTransactionSQL, [transactionId], (deleteErr) => {
      if (deleteErr) {
        console.error(deleteErr);
        res
          .status(500)
          .json({ error: "An error occurred while deleting the transaction" });
      } else {
        res.json({ message: "Transaction deleted successfully" });

        // Now, delete the cache related to the userId
        const redisClient = new redis();
        const redisKey = `user:${userId}`;
        redisClient.del(redisKey, (delErr, deletedCount) => {
          if (delErr) {
            console.error(delErr);
          } else {
            console.log(`Deleted cache for userId: ${userId}`);
          }
          redisClient.quit(); // Close the Redis connection
        });
      }
    });
  });
};

exports.getTransactionsByUser = (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM transactions WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching user transactions" });
    } else {
      res.json(result);
    }
  });
};
