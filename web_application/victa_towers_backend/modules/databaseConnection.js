const mysql = require('mysql2');

const createConnection = async (userName, passWord) => {
  config = {
    host: 'victa-mysql.mysql.database.azure.com',
    user: userName,
    password: passWord,
    database: 'victa', // databasename
    port: 3306
  };
  
  var connection = mysql.createConnection(config);
  try {
    await connection.promise().connect();
    return connection;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

module.exports = {
  createConnection,
};
