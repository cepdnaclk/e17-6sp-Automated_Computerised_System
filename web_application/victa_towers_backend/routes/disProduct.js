const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

// To get distributed product details for a particular distribution manager which are not checked
router.get("/", auth, async(req, res) => {
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const getDistributedProduct = `SELECT * FROM distributed_product;`; 
    try {
        const [response] = await connection.promise().execute(getDistributedProduct);
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

// To get pending delivery details for a particular distribution manager
router.get("/deliveries", auth, async(req, res) => {

});

router.post("/", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const shippingDate = body.shippingDate;
    const assignedQuantity = parseInt(body.quantity);
    const productName = body.productName;
    const salesAgent = body.salesAgentUserName;
    const shopID = body.shopId;
    const enterDistributedProducts = `INSERT INTO distributed_product VALUES ('${batchNumber}', '${shippingDate}', ${assignedQuantity}, '${productName}');`;
    const enterDistributionProcess = `INSERT INTO distribution_process(DBatchNumber, DShippingDate, IssuedDMUserName, SalesAgentUserName, DestinationShopID, DeliveryStatus) VALUES("${batchNumber}", "${shippingDate}", "${fromJwt.jwtUserName}", "${salesAgent}", "${shopID}", "pending");`; 
    const updateIssuedProduct = `UPDATE issued_product SET CurrentQuantity=CurrentQuantity-${assignedQuantity} WHERE BatchNumber="${batchNumber}"`;
    try {
        const [res1] = await connection.promise().execute(enterDistributedProducts);
        const [res2] = await connection.promise().execute(enterDistributionProcess);
        const [res3] = await connection.promise().execute(updateIssuedProduct);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        res.header("x-auth-token", token).status(200).send("Successfully shipped from the store");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

router.put("/receive", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const shippingDate = body.shippingDate;
    const courieredDate = body.courieredDate;
    const courieredQuantity = parseInt(body.quantity);
    const issuedDMuserName = body.issuedDMUserName;
    const destinationShopID = body.destinationShopId;
    let deliveryStatus;
    const getDistributedProductsQuantity = `SELECT * FROM distributed_product WHERE BatchNumber=${batchNumber} AND ShippingDate="${shippingDate}";`;
    const updateDistributionProcess = `UPDATE distribution_process SET CourieredQuantity=${courieredQuantity}, CourieredDate="${courieredDate}", DeliveryStatus=${deliveryStatus} WHERE BatchNumber="${batchNumber}" AND ShippingDate="${shippingDate}" AND IssuedDMUserName="${issuedDMuserName}" AND SalesAgentUserName="${fromJwt.jwtUserName}" AND DestinationShopID="${destinationShopID}";`; 
    const token = jwt.sign(
        {
            jwtUserName: fromJwt.jwtUserName,
            jwtPassWord: fromJwt.jwtPassWord,
            jwtRole: fromJwt.jwtRole
        },
        "victa_jwtPrivateKey"
    );
    try {
        const [res1] = await connection.promise().execute(getDistributedProductsQuantity);
        const distributedProductsQuantity = res1[0].AssignedQuantity;
        if(distributedProductsQuantity != courieredQuantity){
            deliveryStatus = "in-progress";
            const [res2] = await connection.promise().execute(updateDistributionProcess);
            return res.header("x-auth-token", token).status(200).send("Missing happen In delivery process");
        }
        deliveryStatus = "success";
        const [res3] = await connection.promise().execute(updateDistributionProcess);
        res.header("x-auth-token", token).status(200).send("Successfully delivered");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

router.put("/receive/check", auth, async(req, res) => {
    const body = req.body;
    const fromJwt = req.fromUser;
    const connection = await databaseConnection.createConnection(fromJwt.jwtUserName, fromJwt.jwtPassWord);
    const batchNumber = body.batchNumber;
    const shippingDate = body.shippingDate;
    const salesAgentUserName = body.salesAGentUserName;
    const destinationShopID = body.destinationShopId;
    const updateDistributionProcess = `UPDATE distribution_process SET DeliveryStatus="checked" WHERE BatchNumber="${batchNumber}" AND ShippingDate="${shippingDate}" AND IssuedDMUserName="${fromJwt.jwtUserName}" AND SalesAgentUserName="${salesAgentUserName}" AND DestinationShopID="${destinationShopID}";`; 
    try {
        const [response] = await connection.promise().execute(updateDistributionProcess);
        const token = jwt.sign(
            {
                jwtUserName: fromJwt.jwtUserName,
                jwtPassWord: fromJwt.jwtPassWord,
                jwtRole: fromJwt.jwtRole
            },
            "victa_jwtPrivateKey"
        );
        return res.header("x-auth-token", token).status(200).send("Checked shipping process Successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Database failure");
    }
});

module.exports = router;