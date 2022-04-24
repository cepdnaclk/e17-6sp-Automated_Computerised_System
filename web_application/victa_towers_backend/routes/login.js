const express = require("express");
const jwt = require("jsonwebtoken");

const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    console.log(body);
    const connection = await databaseConnection.createConnection(body.userName, body.passWord);
    if(!connection){
        return res.status(400).send("Authentication failed");
    }
    let tableName;
    switch (body.role) {
        case "fm":
          tableName = "factory_manager";
          break;
        case "dm":
          tableName = "distribution_manager";
          break;
        case "sa":
          tableName = "sales_agent";
           break;
        default:
          tableName = "rootAccess"
    }
    if(tableName == "rootAccess"){
      const token = jwt.sign(
        {
          jwtUserName: body.userName,
          jwtPassWord: body.passWord,
          jwtRole: "root"
        },
        "victa_jwtPrivateKey"
      );
      return res.header("x-auth-token", token).status(200).send("Authentication successful");
    }
    const getUserDetails = `SELECT * FROM ${tableName} WHERE username='${body.userName}';`;
    try {
      const [response] = await connection.promise().execute(getUserDetails);
      const token = jwt.sign(
        {
          jwtUserName: body.userName,
          jwtPassWord: body.passWord,
          jwtRole: body.role
        },
        "victa_jwtPrivateKey"
      );
      res.header("x-auth-token", token).status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(400).send("Database failure");
    }
  });
  
module.exports = router;