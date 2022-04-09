const dbConnection = require("../models/dbConfig");

//an endpoint to create a new user
const createNewUser = async (req, res) => {
  //date and timenow
  const dateNow = new Date();
  const date = dateNow.toLocaleDateString();
  const time = dateNow.toLocaleTimeString();
  const timeAndDateNow = `${date} ${time}`;

  const connection = await dbConnection();
  try {
    const { firstName, surName, dateOfBirth } = req.body;
    //check if we have required fields
    if (!firstName || !surName || !dateOfBirth) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all required fields",
      });
    }
    const [result] = await connection.query(
      "INSERT INTO users (firstname, surname, date_of_birth, date_time) VALUES (?, ?, ?, ?)",
      [firstName, surName, dateOfBirth, timeAndDateNow]
    );
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error,
    });
  }
};

//Api endpoint to read the data
const getAllUsers = async (req, res) => {
  try {
    const connection = await dbConnection();
    const [result] = await connection.query("SELECT * FROM users");
    res.status(200).json({
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
      error,
    });
  }
};

module.exports = { createNewUser, getAllUsers };
