const express = require("express");

// const userController = require("../controllers/userController");
const transactionController = require("../controllers/transactionsController");

const router = express.Router();

// router.get("/users/:id", userController.getAllUser);

router.get("/transactions", transactionController.getAllTransactions);

router.post("/transactions", transactionController.createTransactions);

router.put("/transactions/:id", transactionController.updateTransaction);

router.delete("/transactions/:id", transactionController.deleteTransaction);

module.exports = router;
