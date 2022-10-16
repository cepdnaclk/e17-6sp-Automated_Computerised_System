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
    let role;
    switch (body.role) {
        case "fm":
          role = "factory_manager";
          break;
        case "dm":
          role = "distribution_manager";
          break;
        case "sa":
          role = "sales_agent";
           break;
        case "ma":
          role = "manager";
            break;
        default:
          role = ""
    }

    let table_name = role;
    const getUserDetails = `SELECT * FROM ${table_name} WHERE username='${body.userName}';`;
    try {
      const [response] = await connection.promise().execute(getUserDetails);
      if(response.length == 0){
        return res.status(400).send("Authentication Fail");
      }
      const token = jwt.sign(
        {
          jwtUserName: body.userName,
          jwtPassWord: body.passWord,
          jwtRole: body.role
        },
        "victa_jwtPrivateKey"
      );
      const responseBody = {
        userDetails: response,
        token: token,
      }
      res.header("x-auth-token", token).status(200).send(responseBody);
    } catch (error) {
      console.log(error);
      res.status(400).send("Database failure");
    }
  });
  
module.exports = router;