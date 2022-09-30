const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

/*
A route to get all the shops details by the company owner and the Distribution manager
*/
router.get("/", auth, async(req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getShops = `SELECT * FROM shop;`; 
    try {
        const [response] = await connection.promise().execute(getShops);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

/*
A route to create a new shop by the company owner
*/
router.post("/", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const shopName = body.shopName;
    const address = body.address;
    const contact = body.contact;
    const enterShop = `INSERT INTO shop VALUES ('${shopName}', '${address}', '${contact}');`; 
    try {
        const [response] = await connection.promise().execute(enterShop);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send("Inserted new shop successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

module.exports = router;