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
    
    const createUser = `CREATE USER '${body.userName}'@'localhost' IDENTIFIED BY '${body.passWord}';`; 
    const privileges = `GRANT '${tableName}' TO '${body.userName}'@'localhost';`;
    const flushprivilages = "FLUSH PRIVILEGES;";
    const setRole = `SET DEFAULT ROLE ALL TO '${body.userName}'@'localhost';`;
    const signup = `INSERT INTO ${tableName} VALUES ("${body.userName}", "${body.passWord}", "${body.name}", "${body.contact}");`;
    try {
        const [res1] = await connection.promise().execute(createUser);
        const [res2] = await connection.promise().execute(privileges);
        const [res3] = await connection.promise().execute(flushprivilages);
        const [res4] = await connection.promise().execute(setRole);
        const [res5] = await connection.promise().execute(signup);
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