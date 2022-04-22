const express = require("express");
const databaseConnection = require("../modules/databaseConnection");

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);
    const connection = databaseConnection.createConnection("root", "maths123456");
    res.send("Hello Wolrd");
  });
  
module.exports = router;