const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  //get the time and date now
  //datefns
  const dateNow = new Date();
  const date = dateNow.toLocaleDateString();
  const time = dateNow.toLocaleTimeString();
  const timeAndDateNow = `${date} ${time}`;
  const logItem = `${timeAndDateNow}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "logs.txt");
  next();
};

module.exports = { logger };
