const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const fs = require("fs");
const { logger } = require("./middlewares/logEvents");
const corsOptions = require("./config/corsOptions");
const fsPromise = require("fs").promises;

//get all request received and create a log file
app.use(logger);

//CORS

app.use(cors(corsOptions));

//BUILT IN MIDDLEWARE
//accept json from the request body
app.use(express.json());

//form data
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/", require("./routes/api/index"));

//catch all errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

//a port to connect to
const PORT = process.env.PORT || 5000;

//listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
