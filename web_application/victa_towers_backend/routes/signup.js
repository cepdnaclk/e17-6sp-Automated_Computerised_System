const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    console.log(body);
    
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
    }
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    
    const signupFM = `INSERT INTO ${tableName} VALUES ("${body.userName}", "${body.passWord}", "${body.name}", "${body.contact}");`;
    try {
        const [response] = await connection.promise().execute(signupFM);
        console.log(response);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send(`New ${tableName} successfully added to the database`);
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
     }
});

module.exports = router;