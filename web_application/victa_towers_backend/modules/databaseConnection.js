const mysql = require('mysql2');

const createConnection = async (userName, passWord) => {
  config = {
    host: 'localhost',
    user: userName,
    password: passWord,
    database: 'victa', // database_name
    port: 3306
  };
  
  var connection = mysql.createConnection(config);
  try {
    await connection.promise().connect();
    return connection;
  } catch (e) {
    console.log(e.message);
    console.log("Database connection failed");
    return null;
  }
};

module.exports = {
  createConnection,
};
