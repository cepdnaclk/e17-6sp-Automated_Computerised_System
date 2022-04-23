const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getProducts = `SELECT * FROM factory_product;`; 
    try {
        const [response] = await connection.promise().execute(getProducts);
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

router.post("/", auth, async (req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const productDate = body.productDate;
    const productName = body.productName;
    const quantity = parseInt(body.quantity);
    const enterProducts = `INSERT INTO factory_product VALUES ('${batchNumber}', '${productDate}', ${quantity}, ${quantity}, '${productName}', '${fromJwt.jwtUserName}');`; 
    try {
        const [response] = await connection.promise().execute(enterProducts);
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

router.post("/issue", auth, async (req, res) => {
    // to be implement
});

module.exports = router;