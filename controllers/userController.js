import db from "../model/db";

class UserController {
  static getAllUsers(req, res) {
    db.query("SELECT * FROM users", (error, results) => {
      if (error) {
        console.error("Error fetching users:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching users." });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static createUser(req, res) {
    const { name, address } = req.body;

    db.query(
      "INSERT INTO users (name, address) VALUES (?, ?)",
      [name, address],
      (error, result) => {
        if (error) {
          console.error("Error creating user:", error);
          res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
        } else {
          res.status(201).json({ message: "User created successfully." });
        }
      }
    );
  }
}

module.exports = UserController;
