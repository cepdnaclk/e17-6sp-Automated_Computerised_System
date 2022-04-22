const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    console.log(body);
    const connection = await databaseConnection.createConnection(body.userName, body.passWord);
    if(!connection){
        return res.status(400).send("Authentication failed");
    }
    const token = jwt.sign(
        {
          jwtUserName: body.userName,
          jwtPassWord: body.passWord,
          jwtRole: body.role
        },
        "victa_jwtPrivateKey"
    );
    res.header("x-auth-token", token).status(200).send("Authentication successfull");
  });
  
module.exports = router;