const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    console.log(body);
    
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
    }
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    
    const createUser = `CREATE USER '${body.userName}' IDENTIFIED BY '${body.passWord}';`; 
    const privileges = `GRANT '${role}' TO '${body.userName}';`; // grant privileges of the role to the user
    const flushPrivileges = `FLUSH PRIVILEGES;`;
    const setRole = `SET DEFAULT ROLE '${role}' TO '${body.userName}';`; // set default role to above created user
    let table_name = role;
    const signup = `INSERT INTO ${table_name} VALUES ("${body.userName}", "${body.passWord}", "${body.name}", "${body.contact}");`;
    try {
        const [res1] = await connection.promise().execute(createUser);
        const [res2] = await connection.promise().execute(privileges);
        const [res3] = await connection.promise().execute(flushPrivileges);
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
        res.header("x-auth-token", token).status(200).send(`New ${role} successfully added to the database`);
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
     }
});

module.exports = router;