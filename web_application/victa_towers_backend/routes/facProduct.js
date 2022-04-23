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
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const issuedDate = body.issuedDate;
    const issuedQuantity = body.issuedQuantity;
    const issuedProductName = body.productName;
    const getOccurance = `SELECT * FROM issued_product WHERE batchNumber='${batchNumber}'`;
    const insertIssuedProduct = `INSERT INTO issued_product(BatchNumber, IssuedDate, IssuedQuantity, CurrentQuantity, IssuedProductName) VALUES('${batchNumber}', '${issuedDate}', ${issuedQuantity}, ${issuedQuantity}, '${issuedProductName}');`;
    const updateFactoryProduct = `UPDATE factory_product SET currentQuantity = currentQuantity-${issuedQuantity} WHERE batchNumber='${batchNumber}';`;
    const token = jwt.sign(
        {
            jwtUserName: fromJwt.jwtUserName,
            jwtPassWord: fromJwt.jwtPassWord,
            jwtRole: fromJwt.jwtRole
        },
        "victa_jwtPrivateKey"
    );
    try {
        const [res1] = await connection.promise().execute(getOccurance);
        console.log(res1);
        if(!res1.length){
            const [res2] = await connection.promise().execute(insertIssuedProduct); 
            const [res3] = await connection.promise().execute(updateFactoryProduct);
            res.header("x-auth-token", token).status(200).send('Successfully issued');
        }
        else{
            console.log(res1[0]);
            console.log(res1[0].BatchNumber);
            const updateIssuedProduct = `UPDATE issued_product SET issuedQuantity=${issuedQuantity}, receivingstatus=null WHERE BatchNumber='${batchNumber}';`;
            /*
            if(res1[0].receivingstatus == 'success'){

            }
            */
            res.header("x-auth-token", token).status(400).send(res1);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure"); 
    }

});

module.exports = router;