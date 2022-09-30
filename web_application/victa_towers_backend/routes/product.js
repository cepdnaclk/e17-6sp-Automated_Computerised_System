const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getProducts = `SELECT * FROM product;`; 
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

/*
A route to insert details into product table by the company head
*/
router.post("/", auth, async (req, res) => {
    const fromJwt = req.fromUser;
    const body = req.body;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const productName = body.productName;
    const unitPrice = body.unitPrice;
    const enterProduct = `INSERT INTO product VALUES('${productName}', ${unitPrice});`;
    try {
        const [response] = await connection.promise().execute(enterProduct);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send("Successfully inserted the new product details");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

module.exports = router;