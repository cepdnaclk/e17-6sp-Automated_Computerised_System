const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

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

router.post('/receive', auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const receivedQuantity = body.receivedQuantity;
    const getIssuedQuantity = `SELECT IssuedQuantity FROM issued_product WHERE BatchNumber="${batchNumber}"`;
    const token = jwt.sign(
        {
            jwtUserName: fromJwt.jwtUserName,
            jwtPassWord: fromJwt.jwtPassWord,
            jwtRole: fromJwt.jwtRole
        },
        "victa_jwtPrivateKey"
    );
    try {
        const [res1] = await connection.promise().execute(getIssuedQuantity);
        const issuedQuantity = res1[0].IssuedQuantity;
        let receiveStatus;
        const enterReceivedProducts = `UPDATE issued_product SET CurrentQuantity = CurrentQuantity+${receivedQuantity}, ReceivedQuantity=${receivedQuantity}, receivingstatus="${receiveStatus}, CheckedDMUserName="${fromJwt.jwtUserName}"`;
        if(issuedQuantity != receivedQuantity){
            receiveStatus = "In-progress";
            const [res2] = await connection.promise().execute(enterReceivedProducts);
            return res.header("x-auth-token", token).status(200).send("Missing in received batch");
        }
        receiveStatus = "success";
        const [res3] = await connection.promise().execute(enterReceivedProducts);
        return res.header("x-auth-token", token).status(200).send("Receiving process successful");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

router.put('/receive', auth, async(req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const updateReceivingStatus = `UPDATE issued_product SET receivingstatus="success" WHERE BatchNumber=${req.body.batchNumber}`;
    try {
        const [response] = await connection.promise().execute(updateReceivingStatus);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send("ReceivingStatus set to 'success'");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

module.exports = router;