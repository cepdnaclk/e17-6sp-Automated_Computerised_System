const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

/*
A route to retrieve production details by the company head
*/
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


/*
A route to enter factory product details by the factory manager
*/
router.post("/", auth, async (req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const productDate = body.productDate;
    const productName = body.productName;
    const quantity = parseInt(body.quantity);
    const enterProducts = `INSERT INTO factory_product
     (BatchNumber, ProductDate, FactoryProductName, Quantity, EnteredFMUserName)
      VALUES ('${batchNumber}', '${productDate}', '${productName}', ${quantity}, '${fromJwt.jwtUserName}');`; 
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
        res.header("x-auth-token", token).status(200).send("Successfully inserted the production details");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

/* 
A route to issue factory products by the factory manager
*/
router.post("/issue", auth, async (req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const updateIsIssuedField = `UPDATE factory_product SET IsIssued = 1, IssuedFMUserName = '${fromJwt.jwtUserName}'
     WHERE BatchNumber = '${batchNumber}';`
    
    try {
        const [response] = await connection.promise().execute(updateIsIssuedField);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send('Successfully issued');
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure"); 
    }

});

module.exports = router;