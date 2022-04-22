const mysql = require("mysql2");

const createConnection = (userName, passWord) => {
  config = {
    host: "localhost",
    user: userName,
    password: passWord,
    database: "victa", // databasename
  };

  var connection = mysql.createConnection(config);

  connection.connect(function (err) {
    if (err) {
      return console.log(
        "error connecting:" + JSON.stringify(err, undefined, 2)
      );
    }
    console.log("connected successfully to DB.");
  });

  connection = mysql.createConnection(config);
  return connection;
};

module.exports = {
    createConnection
}
