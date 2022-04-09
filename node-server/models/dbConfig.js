const mysql = require("mysql2/promise");

//mysql2 database connection
async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: `sql10.freesqldatabase.com`,
      user: `sql10484733`,
      password: `Sf2N6w1ZSZ`,
      database: `sql10484733`,
    });
    return connection;
  } catch (error) {
    console.log(error);
  }
}

//export the module
module.exports = connect;
