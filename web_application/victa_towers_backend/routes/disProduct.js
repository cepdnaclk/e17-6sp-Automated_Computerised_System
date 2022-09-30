const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

/*
A route to get errored distributions by distribution manager and company owner
*/
router.get("/errored", auth, async(req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getErroredDistributions = `SELECT * FROM distributed_product WHERE DeliveryStatus=0;`;
    try {
        const [response] = await connection.promise().execute(getErroredDistributions);
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
A route to remove errored delivery products by the company owner or distribution manager 
*/
router.put("/errored", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const orderId = body.distributionOrderId;
    const setErroredDistributions = `UPDATE distributed_product SET DeliveryStatus = 1 WHERE DistributionOrderId = '${orderId}';`;
    try {
        const [response] = await connection.promise().execute(setErroredDistributions);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send("Errored distribution is checked");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

/*
A route to insert distributed products to database by the distribution manager
*/
router.post("/", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const assignedQuantity = parseInt(body.quantity);
    const salesAgent = body.salesAgentUserName;
    const shopName = body.destinedShopName;
    const getCurrentQuantity = `SELECT CurrentQuantity FROM issued_product WHERE BatchNumber = '${batchNumber}';`;
    const token = jwt.sign(
        {
            jwtUserName: fromJwt.jwtUserName,
            jwtPassWord: fromJwt.jwtPassWord,
            jwtRole: fromJwt.jwtRole
        },
        "victa_jwtPrivateKey"
    );
    try {
        const [res1] = await connection.promise().execute(getCurrentQuantity);
        let currentQuantity = res1[0].CurrentQuantity;
        console.log(currentQuantity);
        if(currentQuantity >= assignedQuantity){
            let updateCurrentQuantity = `UPDATE issued_product SET CurrentQuantity = ${currentQuantity-assignedQuantity} WHERE BatchNumber = '${batchNumber}';`;
            let assignProducts = `INSERT INTO distributed_product
             (BatchNumber, Quantity, IssuedDMUserName, SalesAgentUserName, DestinedShopName)
              VALUES ('${batchNumber}', ${assignedQuantity}, '${fromJwt.jwtUserName}', '${salesAgent}', '${shopName}');`;
            const [res2] = await connection.promise().execute(updateCurrentQuantity);
            const [res3] = await connection.promise().execute(assignProducts);
            res.header("x-auth-token", token).status(200).send("Successfully assigned to sales agent");
        }
        else{
            res.header("x-auth-token", token).status(400).send("Assigned quantity not exist");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

/*
A route to insert the information by the sales agent
*/
router.put("/receive", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const orderId = body.distributionOrderId;
    const deliveredQuantity = parseInt(body.deliveredQuantity);
    const getIssuedQuantity = `SELECT Quantity FROM distributed_product WHERE DistributionOrderId=${orderId};`;
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
        const assignedQuantity = res1[0].Quantity;
        if(assignedQuantity == deliveredQuantity){
            const updateDistributionProduct = `UPDATE distributed_product SET DeliveryStatus = 1, DeliveredQuantity = ${deliveredQuantity}
             WHERE DistributionOrderId = ${orderId} ; `; 
            const [res2] = await connection.promise().execute(updateDistributionProduct);
            return res.header("x-auth-token", token).status(200).send("Successfully update the delivery status");
        }
        const updateDistributionProduct = `UPDATE distributed_product SET DeliveredQuantity = ${deliveredQuantity} WHERE DistributionOrderId = ${orderId} ; `; 
        const [res2] = await connection.promise().execute(updateDistributionProduct);
        res.header("x-auth-token", token).status(200).send("Delivery is not successful");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

module.exports = router;