const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

/*
A route to get all the issued product
*/
router.get("/", auth, async(req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getIssuedProducts = `SELECT * FROM issued_product;`; 
    try {
        const [response] = await connection.promise().execute(getIssuedProducts);
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
A route to get errored issued products by the company owner 
*/
router.get("/errored", auth, async(req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getIssuedProducts = `SELECT * FROM issued_product WHERE ReceivingStatus = 0;`; 
    try {
        const [response] = await connection.promise().execute(getIssuedProducts);
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
A route to remove errored issued products by the company owner 
*/
router.put("/errored", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const setIssuedProducts = `UPDATE issued_product SET ReceivingStatus = 1 WHERE BatchNumber = '${batchNumber}';`; 
    try {
        const [response] = await connection.promise().execute(setIssuedProducts);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send("Successfully set the receiving status");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

/*
A route to enter stored product detail to issued_product table by the distribution manager
*/
router.post('/', auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const storedDate = body.storedDate;
    const storedQuantity = body.storedQuantity;
    const getReleasedQuantity = `SELECT Quantity FROM factory_product WHERE BatchNumber = '${batchNumber}'`; 
    const token = jwt.sign(
        {
            jwtUserName: fromJwt.jwtUserName,
            jwtPassWord: fromJwt.jwtPassWord,
            jwtRole: fromJwt.jwtRole
        },
        "victa_jwtPrivateKey"
    );
    console.log(storedQuantity);
    try {
        const [response] = await connection.promise().execute(getReleasedQuantity);
        let releasedQuantity = response[0].Quantity;
        console.log(releasedQuantity);
        if(releasedQuantity == storedQuantity){
            const fillStoredData = `INSERT INTO 
                issued_product (BatchNumber, StoredDate, StoredQuantity, CheckedDMUserName, ReceivingStatus, CurrentQuantity)
                VALUES ('${batchNumber}', '${storedDate}', '${storedQuantity}', '${fromJwt.jwtUserName}', 1,'${storedQuantity}');`;
            const [res1] = await connection.promise().execute(fillStoredData);
            res.header("x-auth-token", token).status(200).send("Successfully inserted the stored data");
        }
        else{
            const fillStoredData = `INSERT INTO 
                issued_product (BatchNumber, StoredDate, StoredQuantity, CheckedDMUserName, Note, CurrentQuantity)
                VALUES ('${batchNumber}', '${storedDate}', '${storedQuantity}', '${fromJwt.jwtUserName}', '${releasedQuantity-storedQuantity} items missed', '${storedQuantity}');`;
            const [res1] = await connection.promise().execute(fillStoredData);
            res.header("x-auth-token", token).status(200).send("Successfully inserted the stored data");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

module.exports = router;