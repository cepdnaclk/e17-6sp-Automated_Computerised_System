const mysql = require('mysql2');

const createConnection = async (userName, passWord) => {
  config = {
    host: 'localhost',
    user: userName,
    password: passWord,
    database: 'victa', // databasename
  };
  var connection = mysql.createConnection(config);
  try {
    await connection.promise().connect();
    return connection;
  } catch (e) {
    return null;
  }
};

module.exports = {
  createConnection,
};
